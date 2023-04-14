const Place = require('../../models/place');

async function findPlace(req, res) {
    try {
        const places = await Place.findAll()

        res.json(places)
    } catch (error) {
        res.status(500).json({message: 'Não conseguimos processar sua solicitação.'})
    }
    
};

module.exports = findPlace;