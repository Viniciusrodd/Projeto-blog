
//IMPORTANDO DEPENDÊNCIAS
const express = require('express')
const router = express.Router()
const categoryModel = require('./CategoryModel')
const slugify = require('slugify')



//ROTA DE INSERIR CATEGORIAS
router.get('/admin/categories/new', (req, res) =>{
    res.render('admin/categories/new')
})



//ROTA APENAS PARA SALVAR DADOS ENVIADOS DE CATEGORIAS PRO BD
router.post('/categories/save', (req, res) =>{
    var titleInput = req.body.title

    if(titleInput != ''){
        categoryModel.create({
            title: titleInput,
            slug: slugify(titleInput) //Gera um slug (uma versão URL-amigável do título) a partir do título e o define na nova categoria.
        }) 
        .then(() =>{
            res.redirect('/admin/categories')
        })
    }else{
        res.redirect('/admin/categories/new')
    }
})



//ROTA DE VISIBILIDADE DE CATEGORIAS
router.get('/admin/categories', (req, res) =>{
    categoryModel.findAll()
        .then((dadosCategories) =>{
            res.render('admin/categories/categories', {
                categories: dadosCategories
            })
        })
})



//ROTA VOLTADA PARA DELETAR DADOS DE CATEGORIAS
router.post('/categories/delete', (req, res) =>{
    var idReq = req.body.id

    if(idReq != undefined){ //Verificando se id for diferente de nulo

        if(!isNaN(idReq)){ //Verficando se o id é um algorismo numérico
            categoryModel.destroy({
                where: {
                    id: idReq
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



//ROTA VOLTADA PARA EDITAR DADOS DE CATEGORIAS
router.get('/admin/categories/edit/:id', (req, res) =>{
    var idVar = req.params.id

    categoryModel.findByPk(idVar) //método de procura especifico para IDs e mais rápido
        .then((dadoCategoria) =>{

            if(dadoCategoria != undefined){

            } else{
                res.redirect('/admin/categories')
            }
            
        })
        .catch((erro) =>{
            res.redirect('/admin/categories')
        })
})


module.exports = router