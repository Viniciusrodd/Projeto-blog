
const express = require('express')
const router = express.Router()
const userModel = require('./userModel')

router.get('/admin/users', (req, res) =>{
    res.send('listagem de usuarios')
})

router.get('/admin/users/create', (req, res) =>{
    res.render('admin/usersEjs/create')
})


//ROTA PRA PEGAR DADOS
router.post('/admin/users/created', (req, res) =>{
    var idVar = req.body.id
    var senhaVar = req.body.senha

    res.json({idVar, senhaVar})
})

module.exports = router
