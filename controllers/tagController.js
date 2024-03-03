const Tag = require("../models/Tag") ;

async function createTag(req, res) {
    try {
        const { name } = req.body;
        const oldTag = await Tag.findOne({
          where: {
            name,
          }
        });
    
        // 之前创建过这个标签
        if (oldTag) {
          // 标签没删除
          if (!oldTag.isDeleted) {
            return res.json({ msg: "标签已存在" });
          }
    
          // 标签如果已经删除了则直接将其恢复并更新创建时间
          oldTag.isDeleted = false;
          const newDate = +new Date();
          oldTag.createdAt = newDate;
          oldTag.updatedAt = newDate;
    
          await oldTag.save();
          return res.json(oldTag);
        }
    
        // 之前没创建过则直接创建
        const newTag = await Tag.create({ name });
        res.json(newTag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 


async function getTags(req, res) {
    // todo
    try {
        const tags = await Tag.findAll({
            where: { isDeleted:false },
            // 从返回结果中移除 isDeleted 字段
            attributes: { exclude: ["isDeleted"] },
        }) ;
        console.log(tags) ;
        res.json(tags) ;
    }catch (error) {
        res.status(500).json( {error:error.message}) ;
    }
} 

// async function updateTag(req, res) {
//     // todo
// } 

async function deleteTag(req, res) {
    // todo
    try {
        const { id } = req.params ;
        const tag = await Tag.findByPk(id) ;
        if (!tag) {
            return res.status(404).json( { error: "Tag not found" }) ;
        }
        tag.isDeleted = true ;
        await tag.save() ;
        res.json( {status : "OK"}) ;
    } catch (error) {
        res.status(500).json({ error: error.message }) ;
    } 
}

module.exports = {createTag, getTags, deleteTag} ;