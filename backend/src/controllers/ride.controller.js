const { query } = require("express-validator");
const rideModel = require("../models/ride.model");

const {
  getCaptainsInTheRadius,
  getAddressCoordinate,
} = require("../services/maps.service");

const {
  createRideService,
  getFare,
  confirmRideService,
  startRideService,
  endRideService
} = require("../services/ride.service");
const { sendMessageToSocketId } = require("../socket");

module.exports.createRide = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await createRideService({
      user: req.user,
      pickup,
      destination,
      vehicleType,
    });

    const pickupCoordinates = await getAddressCoordinate(pickup);

    const captainInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.lng,
      pickupCoordinates.ltd,
      5
    );

    ride.otp = "";

    const rideData = await rideModel.findOne(ride._id).populate("user");

    captainInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideData,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const { pickup, destination } = req.query;
  try {
    const fareNew = await getFare(pickup, destination);
    res.status(200).json(fareNew);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const { rideId } = req.body;

  try {
    const ride = await confirmRideService(rideId, req.captain._id);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride_confirmed",
      data: ride,
    });

    return res.status(200).send("Ride Confirmed");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  const { rideId, otp } = req.query;

  try {
    const ride = await startRideService(rideId, otp, req.captain);
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.endRide = async (req, res) => {
  const { rideId } = req.query;
  


  try {
    const ride = await endRideService(rideId, req.captain);
    

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-end",
      data: ride,
    });

    return res.status(200).json(ride);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
};
