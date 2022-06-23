var sequelize = require('sequelize');

var conexao = new sequelize("bancoaula", "Gustavo", "gustavo1001", {
    host: "bancoaula.cysmzdamoc6d.us-east-1.rds.amazonaws.com",
    dialect: "mysql"
})

conexao.authenticate().then(function() {
    console.log("Conectado ao banco com sucesso")
}).catch(function(erro) {
    console.log("Erro ao conectar ao banco:" + erro)
})

module.exports = conexao