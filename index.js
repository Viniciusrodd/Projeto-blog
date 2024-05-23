//IMPORTANDO AS DEPENDENCIAS
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const conection = require('./database/conection')

//Importando nossos controllers(arquivos com os Routers)
const categoriesController = require('./categories/categoriesController')
const articlesController = require('./articles/articleController')

//Impotando tabelas
const articleModel = require('./articles/ArticleModel')
const categoryModel = require('./categories/CategoryModel')

//Importando relação entre tabelas de article e category
const defineRelations = require('./relationships/relation1')


//DIZENDO PARA O EXPRESS USAR O EJS COMO VIEWENGINE 
app.set('view engine', 'ejs')


//DIZENDO PRO EXPRESS USAR ARQUIVOS ESTÁTICOS
app.use(express.static('public'))


//USANDO MIDDLEWARE BODYPARSER NO EXPRESS
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())


app.get('/', (req, res) =>{
    res.render('admin/categories/index')
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


//ABRINDO SERVIDOR NA PORTA 1500
app.listen(3500, () =>{
    console.log('blog rodando')
})