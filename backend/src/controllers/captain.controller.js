const captainModel = require("../models/captain.model");
const BlacklistToken = require("../models/backlistToken.model");
const { createCaptain } = require("../services/captain.service");

// captain registration captains/register
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
  res.cookie("token", token);
  res.status(201).json({ token, captain });
};

// captain login captains/login
exports.loginCaptain = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check if captain exists
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = await captain.generateAuthToken();
    res.cookie("token", token);
    return res.status(200).json({ token, captain });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// get captain profile /captains/profile
exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  const blacklistedToken = new BlacklistToken({ token });
  await blacklistedToken.save();
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
