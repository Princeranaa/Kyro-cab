// backend/src/controllers/maps.controller.js
const mapService = require("../Services/maps.service");

exports.getCoordinates = async (req, res) => {
    try {
        const { address } = req.query;

        const { lat, lng } = await mapService.getCoordinatesFromAddress(address);

        return res.status(200).json({
            success: true,
            coordinates: { lat, lng }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.response?.data?.error || error?.message || "Unable to fetch coordinates"
        });
    }
};

// Get distance and time
exports.getDistanceTime = async (req, res) => {
    try {
        const { origin, destination } = req.query;
        console.log("origin====> ", origin);
        console.log("destination====> ", destination);

        if (!origin || !destination) {
            return res.status(400).json({
                success: false,
                message: "Origin and destination are required"
            });
        }

        const result = await mapService.getDistanceTimeService(origin, destination);
        console.log("result====> ", result);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error(error.message || error);
        return res.status(500).json({
            success: false,
            message: error?.response?.data?.error || error?.message || "Failed to calculate distance and time"
        });
    }
};

exports.getSuggestions = async (req, res) => {
    try {
        const { address } = req.query;

        const results = await mapService.getSuggestions(address);
        console.log("results====> ", results);
        return res.status(200).json({ success: true, data: results });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.message || "Failed to get suggestions"
        });
    }
};
