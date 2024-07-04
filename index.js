
//IMPORTANDO AS DEPENDENCIAS
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const conection = require('./database/conection')
const session = require('express-session')
const adminAuth = require('./middlewares/adminAuth')



//USANDO NOSSO SESSION PARA ARMAZENAR SESSÕES DE USERS
app.use(session({
    secret: 'TextoQualquerQueOExpressPedePraAuamentarSegurançaDasSessões',
    cookie: {
        //tempo máximo de expiração de sessão após inatividade de user
        maxAge: 30000000
    }
}))



//IMPORTANDO NOSSOS CONTROLLERS(ARQUIVOS COM ROUTER)
const categoriesController = require('./categories/categoriesController')
const articlesController = require('./articles/articleController')
const userController = require('./user/userController')



//IMPORTANDO TABELAS
const articleModel = require('./articles/ArticleModel')
const categoryModel = require('./categories/CategoryModel')
const userModel = require('./user/userModel')



//IMPORTANDO RELAÇÕES ENTRE TABELAS DE ARTICLE E CATEGORY
const defineRelations = require('./relationships/relation1')
const { where } = require('sequelize')
//DEFININDO RELAÇÕES
defineRelations()



//SINCRONIZANDO AS TABELAS COM BANCO DE DADOS
conection.sync({force: false})
    .then(() =>{
        console.log('Database sincronizado')
    })
    .catch((error) =>{
        console.log('Erro de sincronização')
    })



//DIZENDO PARA O EXPRESS USAR O EJS COMO VIEWENGINE 
app.set('view engine', 'ejs')



//DIZENDO PRO EXPRESS USAR ARQUIVOS ESTÁTICOS
app.use(express.static('public'))



//USANDO MIDDLEWARE BODYPARSER NO EXPRESS
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())



//AUTENTICANDO CONEXÃO COM BANCO DE DADOS
conection.authenticate()
    .then(() =>{
        console.log('conexão feita com sucesso')
    })
    .catch((error) =>{
        console.log(`erro ${error}`)
    })



//DIZENDO POR EXPRESS USAR MINHAS ROTAS DEFINIDAS PELO 'ROUTER' COM PREFIXO DE '/' SOMENTE
app.use('/', categoriesController)
app.use('/', articlesController)
app.use('/', userController)



//ROTA PRINCIPAL
app.get('/', (req, res) =>{
    articleModel.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
        .then((articlesData) =>{
            res.render('admin/categoriesEjs/index', {
                dadosArticle: articlesData
            })
        })

})



//ROTA PARA PEGAR SLUG
app.get('/:slug', (req, res) =>{
    var slugReq = req.params.slug

    articleModel.findOne({
        where: {
            slug: slugReq
        }
    })
    .then((articleSlug) =>{
        if(articleSlug != undefined){
            res.render('admin/articlesEjs/articleRead', {
                articleSlug: articleSlug
            })
        }else{
            res.redirect('/')
        }
    })
})



//ABRINDO SERVIDOR NA PORTA 1500
app.listen(3500, () =>{
    console.log('blog rodando')
})