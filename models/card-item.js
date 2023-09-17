const Sequelize = require('sequelize');
const sequelize_database = require('../data/database');

const CardItem = sequelize_database.define('cardItem', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    amount : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
});

module.exports = CardItem;