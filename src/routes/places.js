const Router = require('express');

const createPlace = require('../controllers/places/createPlace');
const deletePlace = require('../controllers/places/deletePlace');
const findPlace = require('../controllers/places/findPlaces');
const updatePlace = require('../controllers/places/updatePlace');

const validateToken = require('../middlewares/validateToken');

const tasksRoutes = new Router();

//EX03 - Criando rota POST
tasksRoutes.post('/places', validateToken, createPlace);
//EX04 - Criando rota GET
tasksRoutes.get('/places', validateToken, findPlace);
//EX05 - Criando rota DELETE
tasksRoutes.delete('/places/:id', validateToken, deletePlace);
//EX06 - Criando rota PUT
tasksRoutes.put('/places/:id', validateToken, updatePlace);

module.exports = tasksRoutes;