
//IMPORTANDO AS DEPENDENCIAS
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const conection = require('./database/conection')



//IMPORTANDO NOSSOS CONTROLLERS(ARQUIVOS COM ROUTER)
const categoriesController = require('./categories/categoriesController')
const articlesController = require('./articles/articleController')



//IMPORTANDO TABELAS
const articleModel = require('./articles/ArticleModel')
const categoryModel = require('./categories/CategoryModel')



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



//ROTA PRINCIPAL
app.get('/', (req, res) =>{
    articleModel.findAll()
        .then((articlesData) =>{
            res.render('admin/categoriesEjs/index', {
                dadosArticle: articlesData
            })
        })

})



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


app.get('/:slug', (req, res) =>{
    var slugReq = req.params.slug

    articleModel.findOne({
        where: {
            slug: slugReq
        }
    })
    .then((article) =>{
        if(article != undefined){
            res.render('')
        }else{
            res.redirect('/')
        }
    })
})


//ABRINDO SERVIDOR NA PORTA 1500
app.listen(3500, () =>{
    console.log('blog rodando')
})