

const sequelize = require('sequelize')
const conection = require('../database/conection')

const User = conection.define('users',{
    email: {
        type: sequelize.STRING,
        allowNull: false
    }, senha: { 
        type: sequelize.STRING,
        allowNull: false
    }
})

module.exports = User