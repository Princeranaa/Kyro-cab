const axios = require("axios");

async function getCoordinatesFromAddress(address) {
    const apiKey = process.env.lOCATIONIO_SERVICE_TOKEN;
    const encodedAddress = encodeURIComponent(address);

    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodedAddress}&format=json`;

    const response = await axios.get(url);

    if (!response.data || response.data.length === 0) {
        throw new Error("Address not found");
    }

    const { lat, lon } = response.data[0];

    return { lat: parseFloat(lat), lng: parseFloat(lon) };
}

// Get distance & time between two addresses using LocationIQ Matrix API
async function getDistanceTimeService(origin, destination) {
    if (!origin || !destination) throw new Error("Origin and destination are required");

    try {
        const fromCoords = await getCoordinatesFromAddress(origin);
        const toCoords = await getCoordinatesFromAddress(destination);

        const apiKey = process.env.lOCATIONIO_SERVICE_TOKEN;

        const url = `https://us1.locationiq.com/v1/directions/driving/${fromCoords.lng},${fromCoords.lat};${toCoords.lng},${toCoords.lat}?key=${apiKey}`;

        const response = await axios.get(url);

        if (!response.data || !response.data.routes || response.data.routes.length === 0) {
            throw new Error("No routes found between origin and destination");
        }

        const route = response.data.routes[0];

        return {
            distance: { text: `${(route.distance / 1000).toFixed(2)} km`, value: route.distance },
            duration: { text: `${Math.round(route.duration / 60)} mins`, value: route.duration },
            status: "OK"
        };

    } catch (err) {
        console.error(err.response?.status, err.response?.data || err.message);
        throw err;
    }
}

async function getSuggestions(address) {
    if (!address) throw new Error("Query is required");

    const apiKey = process.env.lOCATIONIO_SERVICE_TOKEN;
    const url = `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${encodeURIComponent(address)}&limit=5&format=json`;

    const response = await axios.get(url);

    return response.data.map(item => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon)
    }));
}

async function getCaptainsInTheRadius(ltd, lng, radius) {
    // radius in km

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });

    return captains;

}





module.exports = {
    getCoordinatesFromAddress,
    getDistanceTimeService,
    getSuggestions,
    getCaptainsInTheRadius

};
