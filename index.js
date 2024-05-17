//IMPORTANDO AS DEPENDENCIAS
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const conection = require('./database/conection')


//DIZENDO PARA O EXPRESS USAR O EJS COMO VIEWENGINE 
app.set('view engine', 'ejs')


//USANDO ROTA PARA UTILIZAR ARQUIVOS ESTÁTICOS
app.use(express.static('public'))


//USANDO MIDDLEWARE BODYPARSER NO EXPRESS
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())


app.get('/', (req, res) =>{
    res.render('index')
})


//ABRINDO SERVIDOR NA PORTA 1500
app.listen(3500, () =>{
    console.log('blog rodando')
})