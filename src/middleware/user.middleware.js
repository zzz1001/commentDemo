const md5password = require('../util/passwoed-handle');

const verifyUser = async (ctx, next)=>{
    //1.获取用户名和密码
    const {name,password} = ctx.request.body;

    //判断用户名或者密码不能空
    if(!name  || !password){
        const error = new Error("用户名或者密码不能为空")
        return ctx.app.emit('error',error,ctx)
    }

    await next();
}

const handlePassword = async (ctx,next) =>{
    let {password} =ctx.request.body;
    ctx.request.body.password = md5password(password)
    await next()
}

module.exports = {
    verifyUser,handlePassword
}