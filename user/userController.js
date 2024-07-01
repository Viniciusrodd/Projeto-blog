
const express = require('express')
const router = express.Router()
const userModel = require('./userModel')

router.get('/admin/users', (req, res) =>{
    res.send('listagem de usuarios')
})

router.get('/admin/users/create', (req, res) =>{
    res.render('admin/usersEjs/create')
})


module.exports = router
