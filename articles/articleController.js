
//IMPORTANDO NOSSAS DEPÊNDENCIAS
const express = require('express')
const router = express.Router()
const categoryModel = require('../categories/CategoryModel')
const articleModel = require('./ArticleModel')
const slugify = require('slugify')



//ROTA DE ARTIGO
router.get('/admin/article', (req, res) =>{
    res.send('rotas de artigo')
})



//ROTA DE CRIAÇÃO DE ARTIGO E EXIBIÇÃO DE CATEGORIAS (READ)
router.get('/admin/article/new', (req, res) =>{
    categoryModel.findAll()
        .then((categoryData) =>{
            res.render('admin/articlesEjs/newArticle', {
                dadosCategory: categoryData
            })
        })
})



//ROTA PARA SALVAR ARTIGOS E CATEGORIAS NO BANCO DE DADOS COM RELAÇÃO ENTRE TABELAS
router.post('/articles/save', (req, res) =>{
    var titleVar = req.body.title
    var bodyVar = req.body.bodyArticle
    var categoryVar = req.body.category

    articleModel.create({
        title: titleVar,
        slug: slugify(titleVar),
        body: bodyVar,
        categoryId: categoryVar
    })
    .then(() =>{
        res.redirect('/admin/article')
    })
})



module.exports = router