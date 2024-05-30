

const express = require('express')
const router = express.Router()

router.get('/article', (req, res) =>{
    res.send('rotas de artigo')
})

router.get('/admin/article/new', (req, res) =>{
    res.render('admin/articlesEjs/newArticle')
})

module.exports = router