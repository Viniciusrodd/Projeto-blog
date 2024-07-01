const Sequelize = requires('sequelize')
const Conection = require('../database/conection')

let User = conection.define('users', {
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull:false
    }
})

module.exports = User