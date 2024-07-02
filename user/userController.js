
//INSTALANDO AS DEPENDÊNCIAS
const express = require('express')
const router = express.Router()
const userModel = require('./userModel')
const bcrypt = require('bcryptjs')


//ROTA DE LISTAGEM DE USERS
router.get('/admin/users', (req, res) =>{
    res.send('listagem de usuarios')
})


//ROTA DE CRIAÇÃO DE USERS
router.get('/admin/users/create', (req, res) =>{
    res.render('admin/usersEjs/create')
})


//ROTA PRA PEGAR DADOS
router.post('/admin/users/created', (req, res) =>{
    var emailVar = req.body.email
    var senhaVar = req.body.senha

    res.json({emailVar, senhaVar})
})



module.exports = router
