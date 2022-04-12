const express=require('express');
const router=express.Router();
const Article=require('../db/model/articleModel');

/*
查询信息 http://localhost:8089/article/all
 */

router.get('/all',(req,res)=>{
    Article.findAll({
        raw:true,
    }).then(result=>{
        res.json({
            status:200,
            msg:'查询成功',
            data:result
        })
    }).catch(err=>{
        console.log(err)
    })
})

// 添加信息：http://localhost:8089/article/add
router.post("/add", (req, res) => {
    let event = req.body.event;
    Article.create({
        // id: event.id,
        title: event.title,
        desc: event.desc,
        cover: event.cover,
        content: event.content,
        created_at: event.created_at,
        updated_at: event.updated_at
    }).then(result => {
        res.json({
            status: 201,
            msg: "添加信息成功",
            data:result
        })
    }).catch(err => {
        console.log(err);
    })
})


// 删除信息：http://localhost:8089/article/del
router.delete("/del", (req, res) => {
    Article.destroy({
        where: {
            id: req.body.id
        }
    }).then(result => {
        res.json({
            status: 204,
            msg: "删除成功"
        })
    })
})

// 更新信息：http://localhost:8089/article/modify
router.put("/modify", (req, res) => {
    let event = req.body.event;
    Article.findOne({
        where: {
            id: event.id
        }
    }).then(info => {
        info.update({
            title: event.title,
            desc: event.desc,
            cover: event.cover,
            content: event.content,
            updated_at: event.updated_at
        }).then(result => {
            res.json({
                status: 201,
                msg: "修改信息成功"
            })
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
})
module.exports=router;