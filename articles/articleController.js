

const express = require('express')
const router = express.Router()

router.get('/article', (req, res) =>{
    res.send('rotas de artigo')
})

router.get('/adm/article/new', (req, res) =>{
    res.send('rota de criação de artigo')
})

module.exports = router