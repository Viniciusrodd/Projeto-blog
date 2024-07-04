

//MIDDLEWARE DE VERIFICAÇÃO DE SESSÃO DE ADMINISTRADOR SE ESTÁ LOGADA OU NÃO
function adminAuth(req, res, next){
    if(req.session.user != undefined){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports = adminAuth