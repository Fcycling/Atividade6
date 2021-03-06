var localStrategy = require("passport-local").Strategy
var banco = require("mysql2")
var bcrypt = require("bcryptjs")

//modelo do usuário
var usuario = require('../models/login');

module.exports = function(passport){
    passport.use(new localStrategy({usernameField:'email'},(email,senha,done) => {

        usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                return done(null,false,{message:"Esta conta não existe"})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    return done(null, user)
                }else{
                    return done(null, false, {message: "Senha incorreta!"})
                }
            })
        })
    }))

    passport.serializeUser((usuario,done)=>{
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, usuario) =>{
            done(err, user)
        })
    })
}