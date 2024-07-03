
//INSTALANDO AS DEPENDÊNCIAS
const express = require('express')
const router = express.Router()
const userModel = require('./userModel')
const bcrypt = require('bcryptjs')



//ROTA DE LISTAGEM DE USERS
router.get('/admin/users', (req, res) =>{
    userModel.findAll()
        .then((usersDados) =>{
            res.render('admin/usersEjs/users', {
                dadosUsers: usersDados
            })
        })
})



//ROTA DE CRIAÇÃO DE USERS
router.get('/admin/users/create', (req, res) =>{
    res.render('admin/usersEjs/create')
})



//ROTA PRA PEGAR DADOS DA CRIAÇÃO DOS USERS
router.post('/admin/users/created', (req, res) =>{
    var emailVar = req.body.email
    var passwordVar = req.body.senha

    userModel.findOne({
        where: {
            email: emailVar
        }
    })
    .then((userDados) =>{
        if(userDados == undefined){
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
        }else{
            res.redirect('/admin/users/created')
        }
    })
})



//ROTA PARA LOGIN DE USERS
router.get('/login', (req, res) =>{
    res.render('admin/usersEjs/login')
})



//ROTA DE AUTENTICAÇÃO
router.post('/authenticate', (req, res) =>{
    var emailVar = req.body.email
    var passwordVar = req.body.senha

    userModel.findOne({
        where: {
            email: emailVar
        }
    })
    .then((dadosPegos) =>{
        if(dadosPegos != undefined){ //verificação pra ver se existe user com esse email
            //validar senha com Bcrypt
            var correct = bcrypt.compareSync(passwordVar, dadosPegos.senha) //senha do user comparada a do BD
                if(correct){
                    //criando sessão
                    req.session.user = {
                        id: dadosPegos.id,
                        email: dadosPegos.email
                    }
                    res.json(req.session.user)
                }else{
                    res.redirect('/login')                
                }
        }else{
            res.redirect('/login')
        }
    })
})



module.exports = router
