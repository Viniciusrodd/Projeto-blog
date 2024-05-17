
const sequelize = require('sequelize')

const conection = new sequelize('blog', 'root', 'bravogamessempre123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = conection