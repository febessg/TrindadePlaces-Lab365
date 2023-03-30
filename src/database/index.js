const Sequelize = require('sequelize');

const connection = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    port: '5432',
    database: 'trindade_places',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      }
});

module.exports = connection;