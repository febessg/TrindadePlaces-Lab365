const Place = require('../../models/place');

async function createPlace(req, res) {
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
    
};

module.exports = createPlace;