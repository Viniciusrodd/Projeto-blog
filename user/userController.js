
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
    var passwordVar = req.body.senha

    //definindo nosso hash de senha
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(passwordVar, salt)

    userModel.create({
        email: emailVar,
        senha: hash
    })
    .then(() =>{
        res.redirect('/')
    })
})



module.exports = router
