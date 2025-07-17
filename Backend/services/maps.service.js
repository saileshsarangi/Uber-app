const axios = require('axios');
const captainModel = require('../models/captain.model');

const ORS_API_KEY = '5b3ce3597851110001cf6248164215f8336945e7a569ce7f8e7cada4';

module.exports.getAddressCoordinate = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'saileshsarangi@gmail.com' // Nominatim requires this
            }
        });

        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: parseFloat(location.lat),   // ✅ FIXED: use `lat` not `ltd`
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Helper function should return { lat, lng }
module.exports.getDistanceTime = async (origin, destination) => {

    try {
        // Get coordinates for both origin and destination
        const [originCoord, destCoord] = await Promise.all([
            module.exports.getAddressCoordinate(origin),
            module.exports.getAddressCoordinate(destination)
        ]);

        // Ensure coordinates are in [lng, lat] format as required by ORS
        const body = {
            locations: [
                [originCoord.lng, originCoord.lat],
                [destCoord.lng, destCoord.lat]
            ],
            metrics: ['distance', 'duration']
        };

        // Make API call to ORS Matrix service
        const response = await axios.post(
            'https://api.openrouteservice.org/v2/matrix/driving-car',
            body,
            {
                headers: {
                    'Authorization': ORS_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        const { distances, durations } = response.data;
        console.log(distances);
        return {
            distance: distances[0][1], // meters
            duration: durations[0][1]  // seconds
        };

    } catch (err) {
        console.error('OpenRouteService Error:', err.response?.data || err.message);
        throw new Error('Unable to fetch distance and time from OpenRouteService');
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${ORS_API_KEY}&text=${encodeURIComponent(input)}&size=5`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.features) {
            return response.data.features.map(item => item.properties.label).filter(Boolean);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error('ORS Autocomplete Error:', err.response?.data || err.message);
        throw err;
    }
};

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {

    // radius in km
   

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ lat, lng ], radius / 6371 ]
            }
        }
    });

    return captains;
}