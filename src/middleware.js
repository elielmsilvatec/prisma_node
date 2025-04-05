

function middleware(req, res, next){
    if (req.session.usuario != undefined) {

       next()
    } else {
        res.status(401).json({ erro: "Usuário não logado" });
    }
}

module.exports = middleware
