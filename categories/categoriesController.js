
//IMPORTANDO DEPENDÊNCIAS
const express = require('express')
const router = express.Router()
const categoryModel = require('./CategoryModel')
const slugify = require('slugify')
const adminAuth = require('../middlewares/adminAuth')



//ROTA DE INSERIR CATEGORIAS
router.get('/admin/categories/new', (req, res) =>{
    res.render('admin/categoriesEjs/new')
})



//CRUD (CREATE)
//ROTA APENAS PARA SALVAR DADOS ENVIADOS DE CATEGORIAS PRO BD
router.post('/categories/save', (req, res) =>{
    var titleVar = req.body.title

    if(titleVar != ''){
        categoryModel.create({
            title: titleVar,
            slug: slugify(titleVar) //Gera um slug (uma versão URL-amigável do título) a partir do título e o define na nova categoria.
        }) 
        .then(() =>{
            res.redirect('/admin/article/new')
        })
    }else{
        res.redirect('/admin/categories/new')
    }
})



//CRUD (READ)
//ROTA DE VISIBILIDADE DE CATEGORIAS
router.get('/admin/categories', adminAuth, (req, res) =>{
    categoryModel.findAll()
        .then((dadosCategories) =>{
            res.render('admin/categoriesEjs/categories', {
                categories: dadosCategories
            })
        })
})



//CRUD (UPDATE/READ)
//ROTA VOLTADA PARA EDITAR DADOS DE CATEGORIAS VISUALMENTE
router.get('/admin/categories/edit/:id', adminAuth, (req, res) =>{
    var idVar = req.params.id

    if(isNaN(idVar)){
        res.redirect('/admin/categories')
    }

    categoryModel.findByPk(idVar) //método de procura especifico para IDs (ache pelos IDs) e mais rápido
        .then((dadosCategoria) =>{

            if(dadosCategoria != undefined){
                res.render('admin/categoriesEjs/edit', {
                    categoria: dadosCategoria
                })
            } else{
                res.redirect('/admin/categories')
            }

        })
        .catch((erro) =>{
            res.redirect('/admin/categories')
        })
})



//CRUD (UPDATE)
//ROTA VOLTADA PARA ATUALIZAR DADOS EDITADOS
router.post('/categories/update', (req, res) =>{
    var idVar = req.body.id
    var titleVar = req.body.title

    categoryModel.update({title: titleVar, slug: slugify(titleVar)},{ //Passando com sequelize OQUE eu quero Atualizar
        where: { //Passando com sequelize AONDE eu quero Atualizar
            id: idVar
        }
    })
    .then(() =>{
        res.redirect('/admin/categories')
    })
})



//CRUD (DELETE)
//ROTA VOLTADA PARA DELETAR DADOS DE CATEGORIAS
router.post('/categories/delete', (req, res) =>{
    var idVar = req.body.id

    if(idVar != undefined){ //Verificando se id for diferente de nulo

        if(!isNaN(idVar)){ //Verficando se o id é um algorismo numérico
            categoryModel.destroy({
                where: {
                    id: idVar
                }
            })
            .then(() =>{
                res.redirect('/admin/categories')
            })
        }else{
            res.redirect('/admin/categories')
        }
        
    }else{
        res.redirect('/admin/categories')
    }
})



module.exports = router