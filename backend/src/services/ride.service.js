const { model } = require("mongoose");
const { getDistanceTime } = require("../controllers/maps.controller");
const rideModel = require("../models/ride.model");
const { getDistanceTimeSerice } = require("./maps.service");
const crypto = require("crypto");

module.exports.createRide = async ({}) => {};

const getFare = async (pickup, destination) => {
  // console.log("====================================");
  // console.log("pickup:", pickup, "destination:", destination);
  // console.log("====================================");

  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceTimeSerice(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };
  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };
  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };
  return fare;
};

module.exports.getFare = getFare;

const getOtp = (num) => {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
};

module.exports.createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports.confirmRideService = async (rideId, captain) => {
  try {
    if (!rideId) {
      throw new Error("Ride id is required");
    }

    const createdRide = await rideModel.findByIdAndUpdate(rideId, {
      status: "accepted",

      captain: captain,
    });

    const ride = await rideModel
      .findById(rideId)
      .populate("user")
      .populate("captain")
      .select("+otp");

    return ride;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRideService = async (rideId, otp) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }
  let ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "accepted") {
    throw new Error("Ride not Accepted");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  return ride;
};

module.exports.endRideService = async (rideID, captain) => {
  if (!rideID) {
    throw new Error("Ride id is required");
  }
  // console.log(rideID);

  try {
    const ride = await rideModel
      .findOne({
        _id: rideID,
      })
      .populate("user")
      .populate("captain")
      .select("+otp");
    console.log(captain._id);
    console.log(ride.captain._id);

    if (captain._id.toString() !== ride.captain._id.toString()) {
      throw new Error("Invalid Ride and Captain Data");
    }

    const completeRide = await rideModel
      .findByIdAndUpdate(rideID, { status: "finish" }, { new: true })
      .populate("user")
      .populate("captain");

    console.log("Ride completed:", completeRide);
    return completeRide;
  } catch (err) {
    console.error("End ride error:", err);
    throw new Error(err.message);
  }
};
