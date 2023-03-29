//EX01 - Iniciando o servidor express
const express = require('express');

const app = express();

app.listen(3333, () => {
    console.log('Servidor Online')
})