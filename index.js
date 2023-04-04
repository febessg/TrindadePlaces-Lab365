//EX01 - Iniciando o servidor express
const express = require('express');

const app = express();

app.use(express.json());

const connection = require('./src/database');

const Place = require('./src/models/place');

connection.sync({alter:true});

//EX03 - Criando rota POST
app.post('/places', async (req, res) => {
    const place = {
        name: req.body.name,
        contact: req.body.contact,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };

    const newPlace = await Place.create(place);

    res.status(201).json(newPlace)
});

//EX04 - Criando rota GET
app.get('/places', async (req, res) => {
    const places = await Place.findAll()

    res.json(places)
});

app.listen(3333, () => {
    console.log('Servidor Online')
})