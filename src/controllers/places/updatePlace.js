const Place = require('../../models/place');

async function updatePlace(req, res) {
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
};

module.exports = updatePlace;