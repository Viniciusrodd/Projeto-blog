

const express = require('express')
const router = express.Router()
const categoryModel = require('../categories/CategoryModel')

router.get('/article', (req, res) =>{
    res.send('rotas de artigo')
})

router.get('/admin/article/new', (req, res) =>{
    categoryModel.findAll()
        .then((categoryData) =>{
            res.render('admin/articlesEjs/newArticle', {
                dadosCategory: categoryData
            })
        })
})

module.exports = router