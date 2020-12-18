const Router = require('koa-router');
const commentRouter = new Router({prefix:'/comment'});
const { verifyAuth} = require('../middleware/auth.middleware');

const {create} = require('../controller/comment.controller');

commentRouter.post('/',verifyAuth,create)

module.exports = commentRouter