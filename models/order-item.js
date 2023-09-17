const Sequelize = require('sequelize');
const sequelize_database = require('../data/database');

const OrderItem = sequelize_database.define('orderItem', {
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

module.exports = OrderItem;