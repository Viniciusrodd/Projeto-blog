

const express = require('express')
const router = express.Router()

router.get('/categories', (req, res) =>{
    res.send('rota categorias')
})

router.get('/adm/categories/new', (req, res) =>{
    res.send('rota de criação de categoria')
})

module.exports = router