require('dotenv').config();

//EX01 - Iniciando o servidor express
const express = require('express');

const app = express();

app.use(express.json());

const connection = require('./src/database');

const tasksRoutes = require('./src/routes/places');
const usersRoutes = require('./src/routes/users');

connection.sync({alter:true});

app.use(tasksRoutes);
app.use(usersRoutes);

app.listen(3333, () => {
    console.log('Servidor Online')
});