

const express = require('express')
const router = express.Router()
const categoryModel = require('./CategoryModel')
const slugify = require('slugify')

router.get('/admin/categories/new', (req, res) =>{
    res.render('admin/categories/new')
})

router.get('/categories/save', (req, res) =>{
    var titleInput = req.body.title

    categoryModel.create({
        title: titleInput
    })

    if(titleInput != undefined){
        
    }else{
        res.redirect('admin/categories/new')
    }
})

module.exports = router