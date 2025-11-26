const rideModel = require("../Models/ride.model");
const { getFare, getOtp } = require("../Services/ride.service");


exports.createRide = async (req, res) => {
    const { pickup, destination, vehicleType } = req.body;
    
    if (!pickup || !destination || !vehicleType) {
        throw new Error("All fields are required")
    }

    const fare = await getFare(pickup, destination);
    console.log("fareeeee====>>>>", fare)

    const ride = await rideModel.create({
        user: req.user._id,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    })
    return res.status(200).json({
        message: "Ride created successfully",
        ride
    })
}

exports.getFare = async (req, res) => {
    const { pickup, destination } = req.query;

    if (!pickup || !destination) {
        return res.status(400).json({ success: false, message: "pickup and destination are required" });
    }

    const fare = await getFare(pickup, destination);

    return res.status(200).json({
        message: "Fare calculated successfully",
        fare
    });
};
