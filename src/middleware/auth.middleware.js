const jwt = require('jsonwebtoken')

const errorTypes =require('../constants/error-types')
const userService = require('../service/user.service')
const authUervice = require('../service/user.service')
const md5password = require('../util/passwoed-handle')
const { PUBLIC_KEY } =require('../app/config')
const authService = require('../service/auth.service')

const verifyLogin = async (ctx,next)=>{
    const { name,password } = ctx.request.body

    //判断用户名和密码是否为空
    if(!name  || !password){
        const error = new Error("用户名或者密码不能为空")
        return ctx.app.emit('error',error,ctx)
    }
    //判断用户是否存在
    const result = await userService.getUserByName(name);
    const user = result[0]
    if(!user){
        const error = new Error(errorTypes.USER_NOT_EXISTS);
        return ctx.app.emit('error',error,ctx)
    }
    //校验密码
    if(user.password !== md5password(password)){
        const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error',error,ctx)
    }

    ctx.user = user
    await next()
}


const verifyAuth = async (ctx,next) => {
    // 获取token
    const authorization = ctx.headers.authorization
    if(!authorization){
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error',error,ctx)        
    }
    const token = authorization.replace('Bearer ','')
    // 验证token
    try {
        const result =  jwt.verify(token,PUBLIC_KEY,{
            algorithms:["RS256"]
        });
        ctx.user = result;
        await next();
    } catch (err) {
        const error = new Error(errorTypes.UNAUTHORIZATION)
        ctx.app.emit('error',error,ctx)
    }

}

const verifyPermission = async (ctx,next) =>{
    ///验证权限
    //1.获取参数
    console.log('查询是否具备权限');
    const {momentId} = ctx.params;
    const { id } = ctx.user
    //2.查询是否具备权限
    try {
        const isPromission = await authService.checkMoment(momentId,id)
        if(!isPromission){
            const error = new Error(errorTypes.UNPROMISSION);
            return ctx.app.emit('error',error,ctx);
        }
        await next()
    } catch (err) {
        const error = new Error(errorTypes.UNPROMISSION);
        return ctx.app.emit('error',error,ctx);
    }   
    
    
}
module.exports = {verifyLogin,verifyAuth,verifyPermission}