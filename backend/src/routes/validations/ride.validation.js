const { body } = require("express");

const rideCreateArr = [
  body("userId")
    .isString()
    .isLength({ min: 24, max: 24 })
    .withMessage("Invalid user id"),
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid user pickup locaiton"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid user destination locaiton"),
];

module.exports = { rideCreateArr };
