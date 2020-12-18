const momentservice = require('../service/moment.service');

class MonmentController {
    async create(ctx,next) {
        ctx.body = "发表动态成功"
        const userId = ctx.user.id
        const content = ctx.request.body.content;
        console.log(userId);
        console.log(content);

        //将数据插入到数据库
        const result = await momentservice.create(userId,content);
        ctx.body = result;

    }


    async detail(ctx,next){
        const momentId = ctx.params.momentId

        // 查询id对应的数据
        const result = await momentservice.getMomentById(momentId)


        ctx.body = result
    }

    async list(ctx,next){
        //获取数据，offset/size
        const {offset,size} = ctx.query;

        // 查询id对应的数据
        const result = await momentservice.getMomentList(offset,size)


        ctx.body = result
    }

    async update(ctx,next){
        const {momentId} = ctx.params;
        const {userId} = ctx.user;
        const {content} = ctx.request.body;
        const result = await momentservice.update(content,momentId);
        ctx.body= result;
    }

    async remove(ctx,next){
        console.log('remove');
        const{momentId} =ctx.params;
        const result = await momentservice.remove(momentId);
        ctx.body= result;
    }
}

module.exports = new MonmentController()