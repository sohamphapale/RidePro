const userModel = require("../models/user.model");
const { createUser } = require("../services/user.service");
const { validationResult, check } = require("express-validator");
const BlacklistToken = require("../models/backlistToken.model");

// Create user users/register
exports.registerUser = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });
  const token = await user.generateAuthToken();

  res.status(201).json({ token, user });
};

//login user users/login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();
    res.cookie("token", token);
    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// get user profile /users/profile
exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

// logout user /users/logout
exports.logoutUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await BlacklistToken.create({ token }); // Store the token in the blacklist
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
