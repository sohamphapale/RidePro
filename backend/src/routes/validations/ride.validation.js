const { body, query } = require("express-validator");

const rideCreateArr = [
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid user pickup locaiton"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid user destination locaiton"),
  body("vehicleType")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid user destination locaiton"),
];

const getFareArr = [
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid user pickup locaiton"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid user destination locaiton"),
];

const startridearr = [
  query("rideId").isMongoId().withMessage("Invalid Ride Id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
];
const endridearr = [query("rideId").isMongoId().withMessage("Invalid Ride Id")];

module.exports = { rideCreateArr, getFareArr, startridearr, endridearr };
