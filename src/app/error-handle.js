const errorTypes = require("../constants/error-types");

const errorHandle = (error,ctx) =>{
    console.log(error.message);
    let status,message
    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            message = '用户名或者密码不能为空';
            break;
        case errorTypes.USER_IS_EXISTS:
            status = 409;
            message = '用户名已经存在';
            break;
        case errorTypes.USER_NOT_EXISTS:
            status = 400;
            message = '用户不存在'
            break;
        case errorTypes.PASSWORD_IS_INCORRENT:
            status = 400;
            message = '密码错误'
            break;
        case errorTypes.UNAUTHORIZATION:
            status = 401;
            message = '无效的token~'
            break;
        case errorTypes.UNPROMISSION:
            status = 401;
            message = '当前用户没有权限'
            break;
        default:
            status = 404;
            message = '页面丢失'
            break;
    }
    ctx.status = status;
    ctx.body = message
}

module.exports = errorHandle ;