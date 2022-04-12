// 公司管理页面

const express = require("express");
const router = express.Router();
const companyModel = require("../db/model/companyModel");
// const Format = require("../js/Format");
const Op = require("sequelize").Op;

/*
 查询 查询所有企业信息：http://localhost:8089/company/all
 */
router.get("/all", (req, res) => {
    companyModel.findAll({
        raw: false
    }).then(result => {
        res.json({
            status: 200,
            msg: "查询成功",
            data: result.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    address:item.address,
                    tel: item.tel,
                    intro:item.intro,
                    longitude:item.longitude,
                    latitude:item.latitude,
                    created_at: item.created_at.Format("yyyy-MM-dd hh:mm:ss"),
                    updated_at: item.updated_at.Format("yyyy-MM-dd hh:mm:ss")
                }
            })
        })
    }).catch(err => {
        console.log(err);
    })
})

/*
 增加 http://localhost:8089/company/add
 */
router.post('/add',(req,res)=>{
    let item=req.body.cmp;

    companyModel.create({

        id: null,
        name: item.name,
        phone: item.phone,
        address:item.address,
        tel: item.tel,
        intro:item.intro,
        longitude:item.longitude,
        latitude:item.latitude,
        created_at: new Date(),
        updated_at: new Date()

    }).then(result=>{
        res.json({
            code:1000,
            msg:'保存成功'
        })
    }).catch(err=>{
        console.log(err)
    })
    }
  )

// 查找：http://localhost:8089/company/one
router.get("/one", (req, res) => {
   companyModel.findAll({
        where: {
            name: {
                [Op.like]: "%" + req.query.name + "%"
            }
        }
    }).then(result => {
        res.json({
            status: 200,
            msg: "查询成功",
            data: result.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    address:item.address,
                    tel: item.tel,
                    intro:item.intro,
                    longitude:item.longitude,
                    latitude:item.latitude,
                    created_at: item.created_at.Format("yyyy-MM-dd hh:mm:ss"),
                    updated_at: item.updated_at.Format("yyyy-MM-dd hh:mm:ss")
                }
            })
        })
    }).catch(err => {
        console.log(err);
    })
})

// 修改：http://localhost:8089/company/modify
router.put("/modify", (req, res) => {
    let item = req.body.user;
    companyModel.findOne({
        where: {
            id: req.body.id
        }
    }).then((person) => {
        person.update({
            name: item.name,
            address:item.address,
            tel: item.tel,
            intro:item.intro,
            longitude:item.longitude,
            latitude:item.latitude
        }).then(result => {
            res.json({
                status: 201,
                msg: "更新成功"
            })
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
})

// 删除：http://localhost:8089/company/delete
router.delete("/delete", (req, res) => {
    companyModel.destroy({
        where: {
            id: req.body.id
        }
    }).then(result => {
        res.json({
            status: 204,
            msg: "删除成功"
        })
    }).catch(err => {
        console.log(err);
    })
})

module.exports=router;