const { body } = require("express-validator");

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

module.exports = { rideCreateArr };
