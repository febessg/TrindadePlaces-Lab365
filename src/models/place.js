//EX02 Criando modelo sequelize
const { Sequelize } = require('sequelize');

const connection = require('../database');

const Place = connection.define('places', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contact: {
        type: Sequelize.STRING(11),
        allowNull: false
    },
    opening_hours: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    latitude: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    longitude: {
        type: Sequelize.BIGINT,
        allowNull: false
    }
});

module.exports = Place;