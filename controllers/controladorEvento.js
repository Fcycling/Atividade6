var evento = require('../models/eventos');
var axios = require("axios");
var qs = require("querystring");



const eventoControlador = {};


eventoControlador.inicio = function(req,res){
    try{
        res.render("inicioGeral")
    }catch(error){
        res.status(500).send("Erro ao renderizar página " + error)
    }
}

eventoControlador.inicioCadastro = function(req,res){
    try{
        res.render("inicioEvento")
    }catch(error){
        res.status(500).send("Erro ao renderizar página " + error)
    }
}



eventoControlador.buscarEventoBanco = function(req,res){
    evento.findAll({
        raw: true,
    }).then(
        function(dados){
        res.render("inicioEvento",{eventos:dados})
        console.log(dados)
        }
    ).catch(function(erro){
        res.status(500).send(`Erro ao buscar Eventos: ${erro}`)
    })
}



eventoControlador.inserirEventoBanco = function(req,res){
    //console.log(req.body.data.toLocaleDateString())
    var date = new Date(req.body.data)
    //console.log(date.toLocaleDateString())
evento.create({
    artista:req.body.artista,
    data: date.toLocaleDateString(),
    local: req.body.local,
    qtdIngressos:req.body.qtdIngressos,
}).then(function(){
res.status(200).redirect("/eventos")
        }

        ).catch(function(error){
res.status(500).send("Erro ao criar Evento: " + error)})
}

eventoControlador.atualizarEventoBanco = function(req,res){
evento.update({
    artista:req.body.artistaEvento,
    data: req.body.dataEvento,
    local: req.body.localEvento,
    qtdIngressos:req.body.qtdIngressos
},{
where:{
id:req.params.id,}
}).then(function(){
res.sendStatus(200)
}
).catch(function(error){
    res.status(500).send("Erro ao atualizar Evento: "+ error)
}
)
}

eventoControlador.removerEvento = function(req,res){
    evento.destroy(
        {
            where:{
                id:req.params.id
            }
        }
    ).then(function(){
        res.sendStatus(200);
    }).catch(function(error){
        res.status(500).send("Erro ao remover Evento: "+ error)
    })
}

eventoControlador.cadastro = function(req,res){
    try{
        res.render("cadastroEvento")
    }catch(error){
        res.status(500).send("Erro ao acessar página de cadastro: "+ error)
    }
}

eventoControlador.editarEventoBanco = function(req,res){
    evento.findOne({
        raw:true,
        where:{
        id:req.params.id}
    }).then(function(evento){
        res.render("editarFormEvento",{
            idEvento:req.params.id,
            artistaEvento: evento.artista,
            localEvento: evento.local,
            dataEvento: evento.data,
            qtdIngressos: evento.qtdIngressos
        })
    }
    ).catch(function(error){
        res.status(500).send("Erro ao acessar página de edição:"+error)
    })
}

eventoControlador.montarReqEdicaoEvento = function(req, res){
    axios.put("/evento/"+ req.params.id, 
    qs.stringify({
        artistaEvento: req.body.artistaEvento,
        localEvento: req.body.localEvento,
        dataEvento: req.body.dataEvento,
        qtdIngressos: req.body.qtdIngressos,
    })
    ,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        proxy: {
            host: 'localhost',
            port: 3000
        }
    }
    ).then(function () {
        res.status(200).redirect("/eventos");
    }).catch(function (error) {
        res.status(500).send("Erro ao editar evento " + error);
    })
}

eventoControlador.montarReqDelete= function(req, res){
    axios.delete('/remover/'+req.params.id,{
        proxy: {
            host: 'localhost',
            port: 3000
        }
    }).then(function () {
        res.status(200).redirect("/eventos");
    }).catch(function (error) {
        res.status(500).send("Erro ao apagar Evento"+ error)
    })
}


eventoControlador.pesquisaArtista = function(req,res){
    evento.findAll({
        raw: true,
        where:{
            
            artista: req.body.artista
        }
    }).then(
        function(dados){
        res.render("inicioEvento",{eventos:dados})
        
        }
    ).catch(function(erro){
        res.status(500).send(`Erro ao buscar artista: ${erro}`)
    })
}

eventoControlador.removerTodosEventos = function(req,res){
    evento.destroy(
        {
            where:{}
        }
    ).then(function(){
        res.sendStatus(200);
    }).catch(function(error){
        res.status(500).send("Erro ao remover todos os Eventos: "+ error)
    })
}


eventoControlador.montarReqApagarTodos= function(req, res){
    axios.delete('/excluirEventos',{
        proxy: {
            host: 'localhost',
            port: 3000
        }
    }).then(function () {
        res.status(200).redirect("/eventos");
    }).catch(function (error) {
        res.status(500).send("Erro ao apagar os Eventos ggg " + error)
    })
}



eventoControlador.mostrarPrevisao = function (req,res){
try{
    res.render("previsaoTempo")
}catch(error){
    res.status(500).send("Erro ao acessar página de previsão de tempo: "+ error)
}
}
module.exports = eventoControlador