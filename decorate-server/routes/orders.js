const express = require("express");
const router = express.Router();
const orderModel = require("../db/model/orderModel");
// const Format = require("../js/Format");
const Op = require("sequelize").Op;

// 查询所有预约信息：http://localhost:8089/orders/all
router.get("/all", (req, res) => {
    orderModel.findAll({
        raw: false
    }).then(result => {
        res.json({
            status: 200,
            msg: "查询成功",
            data: result.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    phone: item.phone,
                    type: item.type,
                    order_date: item.order_date,
                    message: item.message,
                    status: item.status,
                    created_at: item.created_at.Format("yyyy-MM-dd hh:mm:ss"),
                    updated_at: item.updated_at.Format("yyyy-MM-dd hh:mm:ss")
                }
            })
        })
    }).catch(err => {
        console.log(err);
    })
})

// 添加预约信息：http://localhost:8089/orders/add
router.post("/add", (req, res) => {
    let order = req.body.user
    orderModel.create({
        id: null,
        name: order.name,
        phone: order.phone,
        type: order.type,
        order_date: new Date(),
        message: order.message,
        status: order.status,
        created_at: new Date(),
        updated_at: new Date()
    }).then(result => {
        res.json({
            status: 201,
            msg: "订单创建成功"
        })
    }).catch(err => {
        console.log(err);
    })
})

// 查找订单信息：http://localhost:8089/orders/one
router.get("/one", (req, res) => {
    orderModel.findAll({
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
                    phone: item.phone,
                    type: item.type,
                    order_date: item.order_date,
                    message: item.message,
                    status: item.status,
                    created_at: item.created_at.Format("yyyy-MM-dd hh:mm:ss"),
                    updated_at: item.updated_at.Format("yyyy-MM-dd hh:mm:ss")
                }
            })
        })
    }).catch(err => {
        console.log(err);
    })
})

// 修改订单信息：http://localhost:8089/orders/modify
router.put("/modify", (req, res) => {
    let user = req.body.user;
    orderModel.findOne({
        where: {
            id: req.body.id
        }
    }).then((person) => {
        person.update({
            name: user.name,
            phone: user.phone,
            type: user.type,
            message: user.message,
            status: user.status,
            updated_at: new Date()
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

// 删除订单信息：http://localhost:8089/orders/delete
router.delete("/delete", (req, res) => {
    orderModel.destroy({
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

module.exports = router;