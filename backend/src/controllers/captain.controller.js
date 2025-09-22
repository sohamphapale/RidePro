const captainModel = require("../models/captain.model");

const { createCaptain } = require("../services/captain.service");

// captain.controller.js
exports.registerCaptain = async (req, res, next) => {
  const { fullname, email, password, vehicles } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicles.color,
    plate: vehicles.plate,
    capacity: vehicles.capacity,
    vehicleType: vehicles.vehicleType,
  });
  const token = await captain.generateAuthToken();
  res.status(201).json({ token, captain });
};
