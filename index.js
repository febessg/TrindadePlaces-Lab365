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

//EX06 - Criando rota PUT
app.put('/places/:id', async (req, res) => {
    const placeInDB = await Place.findByPk(req.params.id);

    if (!placeInDB) {
        res
        .status(404)
        .json({message: 'Local não encontrado'})
    }

    placeInDB.name = placeInDB.name;
    placeInDB.contact = req.body.contact || placeInDB.contact;
    placeInDB.opening_hours = req.body.opening_hours || placeInDB.opening_hours;
    placeInDB.description = req.body.description || placeInDB.description;
    placeInDB.latitude = placeInDB.latitude;
    placeInDB.longitude = placeInDB.longitude;

    await placeInDB.save();

    res.json(placeInDB);
})

app.listen(3333, () => {
    console.log('Servidor Online')
})