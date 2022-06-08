var ingresso = require('../models/ingresso')
var axios = require('axios')
var qs = require('querystring')


const ingressoControlador = {}

ingressoControlador.buscarIngressoBanco = function(req,res){
    ingresso.findAll({
        raw: true
    }).then(function(dados){
        res.render("inicioIngessos",{ingresso:dados})
        console.log(dados)
    }).catch(function(error){
        res.status(500).send(`Erro ao buscar Ingresso : ${error}`)
  })
}

ingressoControlador.inserirIngressoBanco= function(req,res){
    ingresso.create({
        categoria: req.body.categoria,
        assento: req.body.assento,
        preco: req.body.preco
        }).then(function(){
            res.status(200).redirect("/ingressos");
        }
        ).catch(function(error){
            res.status(500).send("Erro ao criar Ingresso:"+error)
        })
}

ingressoControlador.atualizarIngressoBanco= function(req,res){
    ingresso.update({
        categoria:req.body.categoriaIngresso,
        assento:req.body.assentoIngresso,
        preco:req.body.precoIngresso
    },{
        where: {
            id:req.params.id,}
    }).then(function(){
        res.sendStatus(200);
    }).catch(function(error){
        res.status(500).send("Erro ao atualizar Ingresso:"+error)
    })
}

ingressoControlador.removerIngressoBanco = function(req,res){
    ingresso.destroy({
        where:{
            id:req.params.id
        }
    }).then(function(){
        res.sendStatus(200)
    }).catch(function(error){
        res.status(500).send("Erro ao remover Ingresso:"+error)
    })
}

ingressoControlador.cadastroIngresso = function(req,res){
    try{
        res.render("cadastroIngresso")
    }catch(error){
        res.status(500).send("Erro ao acessar página de cadastro:" +erro)
    }
}

ingressoControlador.editarIngressoBanco = function(req,res){
    ingresso.findOne({
        raw:true,
        where:{
            id: req.params.id}
    }).then(function(ingresso){
        res.render("editarFormIngressos",{
            idIngresso: req.params.id,
            categoriaIngresso:ingresso.categoria,
            assentoIngresso: ingresso.assento,
            precoIngresso: ingresso.preco,
              
        })
    }).catch(function(error){
        res.status(500).send("Erro ao acessar página de edição:" +error)
    })
}

ingressoControlador.montarReqEdicao = function(req, res){
    axios.put('/ingresso/'+ req.params.id,
    qs.stringify({
        categoriaIngresso: req.body.categoriaIngresso,
        assentoIngresso: req.body.assentoIngresso,
        precoIngresso: req.body.precoIngresso,
    }),{headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    proxy:{
        host: 'localhost',
        port: 3000
    }
}
).then(function(){
    res.status(200).redirect('/ingressos')
}).catch(function(error){
    res.status(500).send("Erro ao editar Ingresso "+error)
})
}

ingressoControlador.montarReqDelete = function(req,res){
    axios.delete('/removerIngresso/'+req.params.id,{
        proxy:{
            host:'localhost',
            port:3000
        }
    }).then(function(){
        res.status(200).redirect("/ingressos")
    }).catch(function(error){
        res.status(500).send("Erro ao apagar Ingresso" +error)
    })
}

ingressoControlador.pesquisarIngresso = function(req,res){
    ingresso.findAll({
        raw: true,
        where:{
            categoria: req.body.categoria
        }
    }).then(function(dados){
        res.render("inicioIngessos",{ingresso:dados})
        console.log(dados)
    }).catch(function(error){
        res.status(500).send(`Erro ao buscar Ingresso : ${error}`)
  })
}


ingressoControlador.apagarIngressos = function(req,res){
    ingresso.destroy({
        where:{}
    }).then(function(){
        res.sendStatus(200)
    }).catch(function(error){
        res.status(500).send("Erro ao apagar os Ingressos: " + error)
    })
}

ingressoControlador.montarReqApagarIngressos= function(req, res){
    axios.delete('/apagar',{
        proxy: {
            host: 'localhost',
            port: 3000
        }
    }).then(function () {
        res.status(200).redirect("/ingressos");
    }).catch(function (error) {
        res.status(500).send("Erro ao apagar os Ingressos gggg " + error)
    })
}


module.exports = ingressoControlador
