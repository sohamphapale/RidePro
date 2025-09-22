const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const BlacklistToken = require("../models/backlistToken.model");

// Middleware to authenticate user using JWT
module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "1Unauthorized" });
  }
  const isBlacklisted = await BlacklistToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "2Unauthorized" });
    }
    req.user = user;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: err.message });
  }
};
