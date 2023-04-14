const Place = require('../../models/place');

async function deletePlace(req, res) {
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
    
};

module.exports = deletePlace;