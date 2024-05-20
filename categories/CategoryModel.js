
//Importando sequelize e conexão
const sequelize = require('sequelize')
const conection = require('../database/conection')

//Criando nosso model de tabela 'Category'
const Category = conection.define('categories',{
    title: {
        type: sequelize.STRING,
        allowNull: false
    }, slug: { //slug" é um termo usado para descrever uma versão amigável e legível de um nome ou título que 
        //é convertido em um formato adequado para URLs
        type: sequelize.STRING,
        allownull: false
    }
})

//Exportando nosso Model de tabela
module.exports = Category