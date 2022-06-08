var sequelize = require('sequelize');
var banco = require('../configs/configBanco');

var ingresso = banco.define('ingresso',{

id: {
type: sequelize.INTEGER,
allowNull: false,
primaryKey: true,
autoIncrement: true,
},
categoria: {
type: sequelize.STRING(50),
allowNull: false,
},
assento: {
type: sequelize.STRING(50),
allowNull: false,
},
preco:{
type: sequelize.STRING(50),
allowNull: false,
}
},{
    freezeTable: true,
    timestamps: false
})
ingresso.sync()
module.exports= ingresso