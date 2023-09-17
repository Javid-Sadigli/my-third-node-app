const sequelize_database = require('../data/database');
const Sequelize = require('sequelize');

const User = sequelize_database.define('user', {
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false
    }, 
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

module.exports = User;


