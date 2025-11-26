const rideModel = require("../Models/ride.model");
const { getFare, getOtp } = require("../Services/ride.service");


exports.createRide = async (req, res) => {
    const { pikup, destination, vehicleType } = req.body;

    if (!pikup || !destination || !vehicleType) {
        throw new Error("All fields are required")
    }

    const fare = await getFare(pikup, destination);
    console.log("fareeeee====>>>>", fare)

    const ride = await rideModel.create({
        user: req.user._id,
        pikup,
        destination,
        otp:getOtp(6),
        fare: fare[vehicleType]
    })
    return res.status(200).json({
        message: "Ride created successfully",
        ride
    })


}