const rideModel = require("../Models/ride.model");
const { getFare, getOtp, confirmRide } = require("../Services/ride.service");
const mapService = require("../Services/maps.service");
const rideService = require("../Services/ride.service");
const { sendMessageToSocketId } = require("../../socket");

exports.createRide = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;

  if (!pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);
  console.log("fareeeee====>>>>", fare);

  const ride = await rideModel.create({
    user: req.user._id,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  //  Get coordinates
  const pickupCoordinates = await mapService.getCoordinatesFromAddress(pickup);
  console.log("PickupCoordinates====>>>>", pickupCoordinates);

  // ❗ Use correct lat/lng keys based on what your service returns
  const captainsInRadius = await mapService.getCaptainsInTheRadius(
    pickupCoordinates.lat, // or pickupCoordinates.latitude
    pickupCoordinates.lng, // or pickupCoordinates.longitude
    10
  );

  const rideWithUser = await rideModel
    .findOne({ _id: ride._id })
    .populate("user");

  captainsInRadius.map((captain) =>
    sendMessageToSocketId(captain.socketId, {
      event: "new-ride",
      data: rideWithUser,
    })
  );

  /*  console.log(
    "captainsInRadius: ",
    captainsInRadius.map((captain) => ({
      _id: captain._id,
      fullname: captain.fullname,
      vehicle: captain.vehicle,
      vehicleType: captain.vehicleType,
      capacity: captain.capacity,
      location: captain.location,
      rating: captain.rating || 5,
    }))
  ); */

  /* 
  // Remove sensitive data before sending to client
  const captainsData = captainsInRadius.map(captain => ({
    _id: captain._id,
    fullname: captain.fullname,
    vehicle: captain.vehicle,
    vehicleType: captain.vehicleType,
    capacity: captain.capacity,
    location: captain.location,
    rating: captain.rating || 5
  }));
  
  
  
  */

  res.status(200).json({
    message: "Ride created successfully",
    ride,
  });
};

exports.getFare = async (req, res) => {
  const { pickup, destination } = req.query;

  if (!pickup || !destination) {
    return res
      .status(400)
      .json({ success: false, message: "pickup and destination are required" });
  }

  const fare = await getFare(pickup, destination);

  return res.status(200).json({
    message: "Fare calculated successfully",
    fare,
  });
};

exports.confirmRide = async (req, res) => {


    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

