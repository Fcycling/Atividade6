var usuario = require('../models/login')

const controladorUsuario = {}

var cripto= require("bcryptjs")



controladorUsuario.acharEmail = function(req,res){
    usuario.findOne({
        raw:true,
        where:{
            email: req.body.email}
    }).then(
        function(user){
            cripto.compare(req.body.senha,user.senha).then(
                function(result){
                    req.flash("success_msg","Login efetuado com sucesso!")
                    console.log(result)
                    if(result){
                        res.status(200).redirect("/usuarios");
                    }else{
                        res.status(500).send("Erro ao realizar login");
                    }
                }
            ).catch(
                function(error){
                    req.flash("error_msg","Erro ao logar")
                    res.status(500).send("Erro: " + error)
                }
            )
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao procurar email: " + error)
        }
    )
}






controladorUsuario.paginaCadastrar = function(req,res){
    try{
        res.render("cadastroUsuario")
    }catch(error){
        res.status(500).send("Erro ao entrar na página de cadastro:" + error)
    }
}

controladorUsuario.mostrarLogin = function(req,res) {  
    try {
        res.render("login")
    } catch (error) {
        res.status(500).send("Erro ao entrar na página de login: " + error)
    }
    
}

controladorUsuario.buscarUsuarios = function(req,res){
    usuario.findAll({
        raw: true,
    }).then(
        function(dados){
        res.render("inicioUsuario",{usuario:dados})
        console.log(dados)
        }
    ).catch(function(erro){
        res.status(500).send(`Erro ao buscar Usuários: ${erro}`)
    })
}

controladorUsuario.inserirUsuarioBanco=  async function(req,res){
   var erros = []
   
   if(!req.body.email|| typeof req.body.email == undefined || req.body.email == null){
       erros.push({texto: "Email inválido"})
   }
   
   if(!req.body.senha|| typeof req.body.senha == undefined || req.body.senha == null){
    erros.push({texto:"Senha Inválida"})   
   }
   if(req.body.senha.length<6){
       erros.push({texto:"Senha Pequena"})
   }
   if(erros.length>0){
       res.render("cadastroUsuario",{errosNaPagina: erros})
   }else{
    var password = await cripto.hash(req.body.senha,8)
    
    usuario.create({
        email: req.body.email,
        senha: password
        }).then(function(){
            req.flash("success_msg","Cadastro realizado com Sucesso")
            res.status(200).redirect("/login");
        }
        ).catch(function(error){
            req.flash("error_msg","Erro ao cadastrar usuário")
            res.redirect("/usuarios")
            //res.status(500).send("Erro ao criar Usuário:"+error)
        })
    }
}



module.exports = controladorUsuario
