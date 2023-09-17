const Sequelize = require('sequelize');
const sequelize_database = require('../data/database');

const Order = sequelize_database.define('order', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    totalPrice : {
        type : Sequelize.DOUBLE,
        allowNull : false,
        defaultValue : 0
    }
});

module.exports = Order;