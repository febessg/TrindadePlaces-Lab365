//EX01 - Iniciando o servidor express
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const connection = require('./src/database');

const Place = require('./src/models/place');

const User = require('./src/models/user');

connection.sync({alter:true});

//EX03 - Criando rota POST
app.post('/places', async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({message: 'Não conseguimos processar sua solicitação.'})
    }
    
});

//EX04 - Criando rota GET
app.get('/places', async (req, res) => {
    try {
        const places = await Place.findAll()

        res.json(places)
    } catch (error) {
        res.status(500).json({message: 'Não conseguimos processar sua solicitação.'})
    }
    
});

//EX05 - Criando rota DELETE
app.delete('/places/:id', async (req, res) => {
    try {
        const placeInDB = await Place.findByPk(req.params.id);

        if (!placeInDB) {
            return res
            .status(404)
            .json({message: 'Local não encontrado'})
        };

        await Place.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(204);
    } catch (error) {
        res.status(500).json({message: 'Não conseguimos processar sua solicitação.'})
    }
    
})

//EX06 - Criando rota PUT
app.put('/places/:id', async (req, res) => {
    try {
        const placeInDB = await Place.findByPk(req.params.id);

        if (!placeInDB) {
        return res
            .status(404)
            .json({message: 'Local não encontrado'})
        }

        placeInDB.name = req.body.name || placeInDB.name;
        placeInDB.contact = req.body.contact || placeInDB.contact;
        placeInDB.opening_hours = req.body.opening_hours || placeInDB.opening_hours;
        placeInDB.description = req.body.description || placeInDB.description;
        placeInDB.latitude = req.body.latitude || placeInDB.latitude;
        placeInDB.longitude = req.body.longitude || placeInDB.longitude;

        await placeInDB.save();

        res.json(placeInDB);
    } catch (error) {
        res.status(500).json({message: 'Não conseguimos processar sua solicitação.'})
    }
    
});

//[M1S10] Ex 02 - Criando rota POST para User
app.post('/users', async (req, res) => {
    try {
        const user = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
        }

        const newUser = await User.create(user);

        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message: 'Não conseguimos processar sua solicitação.'})
    }
    
});

//[M1S10] Ex 03 - Criando uma rota de sessão e JWT
app.post('/sessions', async (req, res) => {
    try {
        const userInDb = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!userInDb) {
            return res
            .status(409)
            .json({message: 'Usuário ou senha incorreto'})
        };

        const token = jwt.sign(
            {
                id: userInDb.id
            },
            'PMX980312',
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({name: userInDb.name, token: token});
    } catch (error) {
        res.status(500).json({message: 'Não conseguimos processar sua solicitação.'})
    }
})

app.listen(3333, () => {
    console.log('Servidor Online')
});