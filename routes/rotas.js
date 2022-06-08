const express = require('express');
const evento = require('../controllers/controladorEvento')
const passagem = require('../controllers/ingressoControlador')

const usuario = require('../controllers/usuarioControlador')

const rotas = express.Router();

//rota para a página de exibição quando carregado o site
rotas.get('/', evento.inicio);

//rota para buscar eventos ou ingressos no banco e exibir
rotas.get('/eventos', evento.buscarEventoBanco);
rotas.get('/ingressos', passagem.buscarIngressoBanco);


//rota para inserir um evento ou ingresso no banco de dados
rotas.post("/evento", evento.inserirEventoBanco);
rotas.post("/ingresso", passagem.inserirIngressoBanco);

//rota para fazer a atulização dos dados
rotas.put("/evento/:id", evento.atualizarEventoBanco);
rotas.put("/ingresso/:id", passagem.atualizarIngressoBanco);


//rota para apagar do banco
rotas.delete("/remover/:id", evento.removerEvento)
rotas.delete("/removerIngresso/:id", passagem.removerIngressoBanco);

//rota para cadastro evento ou ingresso
rotas.get("/cadastroEvento", evento.cadastro);
rotas.get("/cadastrar", passagem.cadastroIngresso);



//rota de ediçao de evento ou ingresso
rotas.get("/editarEvento/:id", evento.editarEventoBanco);
rotas.get("/editar/:id", passagem.editarIngressoBanco);

// montagem da requisição para editar evento ou ingresso
rotas.post("/ediReqEvento/:id", evento.montarReqEdicaoEvento);
rotas.post("/ediReq/:id", passagem.montarReqEdicao);

//montagem da requisição para apagar eventos e ingressos
rotas.get("/removerEvento/:id", evento.montarReqDelete);
rotas.get("/removerIngresso/:id", passagem.montarReqDelete);


//pesquisa eventos

rotas.post("/pesquisa", evento.pesquisaArtista);


//pesquisa ingressos

rotas.post("/pesquisaIngresso", passagem.pesquisarIngresso)

//rota para apagar todos os eventos
rotas.delete("/excluirEventos", evento.removerTodosEventos)
rotas.get("/apagarEventos", evento.montarReqApagarTodos)


//rota para apagar todos os ingressos
rotas.delete("/apagar", passagem.apagarIngressos);
rotas.get("/excluirIngressos", passagem.montarReqApagarIngressos)



//rotas usuários
rotas.get("/login", usuario.mostrarLogin);
rotas.get("/usuarios", usuario.buscarUsuarios);
rotas.post("/cadastro/usuario", usuario.inserirUsuarioBanco);
rotas.get("/cadastrar/usuario", usuario.paginaCadastrar);
rotas.post("/achar/email",usuario.acharEmail);


//rota previsão do tempo
rotas.get("/prevTempo", evento.mostrarPrevisao);

module.exports = rotas;