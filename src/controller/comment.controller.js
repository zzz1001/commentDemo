const commentservice = require('../service/comment.service')

class CommentController {
    async create(ctx,next){
        const {momentId,content} = ctx.request.body;
        const {id} = ctx.user;
        const result = commentservice.create(momentId,content,id)
        ctx.body='发表评论成功'
    }
}

module.exports = new CommentController()