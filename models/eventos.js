var sequelize = require('sequelize');
var banco = require('../configs/configBanco');

var evento = banco.define('evento',{

id: {
type: sequelize.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
},
artista: {
type: sequelize.STRING(50),
allowNull: false,
},
data: {
type: sequelize.STRING(50),
allowNull: false,
},
local: {
type: sequelize.STRING(50),
allowNull: false,
},
qtdIngressos: {
type: sequelize.INTEGER,
allowNull: false,
}
},{
    freezeTable: true,
    timestamps: false
})

evento.sync()
module.exports = evento;