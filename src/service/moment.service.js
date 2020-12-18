const connection = require('../app/database')

class MomentService {
    async create (userId,content){
         const statement = `INSERT INTO moment (content, user_id) VALUES (?,?);`
         const [result] = await connection.execute(statement,[content,userId])
         return result
    }

    async getMomentById(momentId){
        const statement  = `
            SELECT 
                m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
                JSON_OBJECT('id', u.id, 'name', u.name) user
            FROM moment m
            LEFT JOIN users u ON m.user_id = u.id
            WHERE m.id =?
        `;
        const [result] = await connection.execute(statement,[momentId])
        return result;
    }

    async getMomentList(offset,size){
        console.log(offset);
        const statement = `
            SELECT 
                m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
                JSON_OBJECT('id', u.id, 'name', u.name) user
            FROM moment m
            LEFT JOIN users u ON m.user_id = u.id
            LIMIT ?,?;
        `
        const [result] = await connection.execute(statement,[offset,size])
        return result;
    }

    async update (content,momentId){
        const statement = `UPDATE moment SET content =? WHERE id =?;`;
        const [result] = await connection.execute(statement,[content,momentId])
        return result
    }

    async remove (momentId){
        const statement = `DELETE FROM moment WHERE id =?;`;
        const [result] = await connection.execute(statement,[momentId]);
        return result;
    }
}

module.exports = new MomentService();