

const express = require('express')
const router = express.Router()
const categoryModel = require('./CategoryModel')
const slugify = require('slugify')


router.get('/admin/categories/new', (req, res) =>{
    res.render('admin/categories/new')
})


router.post('/categories/save', (req, res) =>{
    var titleInput = req.body.title

    if(titleInput != undefined){
        categoryModel.create({
            title: titleInput,
            slug: slugify(titleInput) //Gera um slug (uma versão URL-amigável do título) a partir do título e o define na nova categoria.
        }) 
        .then(() =>{
            res.redirect('/')
        })
    }else{
        res.redirect('admin/categories/new')
    }
})


router.get('/admin/categories', (req, res) =>{
    categoryModel.findAll()
        .then((dadosCategories) =>{
            res.render('admin/categories/categories', {
                categories: dadosCategories
            })
        })
})


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

module.exports = router