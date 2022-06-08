var sequelize = require('sequelize');
var banco = require('../configs/configBanco');

var usuario = banco.define('usuario',{

id: {
type: sequelize.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
},
email: {
type: sequelize.STRING(50),
allowNull: false,
},
senha: {
type: sequelize.STRING,
allowNull: false,
}

},{
    freezeTable: true,
    timestamps: false
})
usuario.sync()

module.exports= usuario