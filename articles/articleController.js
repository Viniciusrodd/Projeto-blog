
//IMPORTANDO NOSSAS DEPÊNDENCIAS
const express = require('express')
const router = express.Router()
const categoryModel = require('../categories/CategoryModel')
const articleModel = require('./ArticleModel')
const slugify = require('slugify')



//ROTA DE CRIAÇÃO DE ARTIGO E EXIBIÇÃO DE DADOS DE ARTIGOS (READ)
router.get('/admin/article', (req, res) =>{
    articleModel.findAll({
        //Especificando associações (joins) com 'include: [{}]'
        //Isso é feito para mostrar dados de outra tabela(categoryModel) lá no ejs
        include: [{
            model: categoryModel
        }]
    })
        .then((ArticlesData) =>{
            res.render('admin/articlesEjs/articles', {
                dadosArticle: ArticlesData
            })
        })
})



//ROTA DE CRIAÇÃO DE ARTIGO E EXIBIÇÃO DE DADOS DE CATEGORIAS (READ)
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