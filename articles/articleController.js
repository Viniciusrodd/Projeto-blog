
//IMPORTANDO NOSSAS DEPÊNDENCIAS
const express = require('express')
const router = express.Router()
const categoryModel = require('../categories/CategoryModel')
const articleModel = require('./ArticleModel')
const slugify = require('slugify')
const adminAuth = require('../middlewares/adminAuth')



//ROTA DE CRIAÇÃO DE ARTIGO E EXIBIÇÃO DE DADOS DE ARTIGOS (READ)
router.get('/admin/article', adminAuth, (req, res) =>{
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
router.get('/admin/article/new', adminAuth, (req, res) =>{
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



//ROTA DE DELETAR ARTIGOS
router.post('/admin/article/delete', (req, res) =>{
    var Idvar = req.body.id

    articleModel.destroy({
        where: {
            id: Idvar
        }
    })
    .then(() =>{
        res.redirect('/admin/article')
    })
})



//ROTA VOLTADA PARA EDITAR DADOS DE ARTIGO VISUALMENTE
router.get('/admin/article/edit/:id', adminAuth, (req, res) =>{
    var varId = req.params.id

    articleModel.findByPk(varId)
        .then((dadosArticle) =>{
            res.render('admin/articlesEjs/articleEdit',{
                artigoDados: dadosArticle
            })
        })
        .catch((err) =>{
            res.redirect('/admin/article')
        })
})



//ROTA PARA EDITAR ARTIGO
router.post('/admin/article/edit', adminAuth, (req, res) =>{
    var idVar = req.body.id
    var bodyVar = req.body.body
    var titleVar = req.body.title

    articleModel.update(
        {
            title: titleVar,
            slug: slugify(titleVar),
            body:bodyVar
        },
        {
            where:{
                id: idVar
            }
        }
    )
    .then(() =>{
        res.redirect('/admin/article')
    })
})



module.exports = router