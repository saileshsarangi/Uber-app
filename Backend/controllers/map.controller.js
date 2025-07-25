const mapService = require('../services/maps.service')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() })
    }


    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates)
    } catch (err) {
        res.status(404).json({ message: 'coordinate not found' });
    }
}


module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;

        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);


    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports.getAutoCompleteSuggestion = async (req, res) => {
    console.log('inside suggestaion');
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {input} = req.query;

        const suggesations = await mapService.getAutoCompleteSuggestions(input);
        console.log(suggesations)
        res.status(200).json(suggesations)
    } catch (error) {
           console.log(error)
           res.status(500).json({message:"internal server error"})
    }
}