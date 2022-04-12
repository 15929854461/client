const DB=require('../config/dbconfig')
const Sequelize=require('sequelize');

const ArticleModel= DB.define('article',{
    id:{
        type:Sequelize.STRING,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    title:{
        type:Sequelize.STRING(30),
    },
    cate:{
        type:Sequelize.STRING,
    },
    desc:{
        type:Sequelize.STRING(255)
    },
    cover:{
        type:Sequelize.STRING(255)
    },
    content:{
        type:Sequelize.TEXT
    },
    created_at:{
        type:Sequelize.DATE
    },
    updated_at:{
        type:Sequelize.DATE
    }
},{
freezeTableName:true,
    timestamps:false
})

module.exports=ArticleModel;