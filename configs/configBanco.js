var sequelize = require('sequelize');

var conexao = new sequelize("banco", "root", "nicaslo@07", {
    host: "localhost",
    dialect: "mysql"
})

conexao.authenticate().then(function() {
    console.log("Conectado ao banco com sucesso")
}).catch(function(erro) {
    console.log("Erro ao conectar ao banco:" + erro)
})

module.exports = conexao