const { body, validationResult } = require("express-validator");

// Validations for user registration -> users/register
const captainValidations = [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("vehicles.color")
    .isLength({ min: 3 })
    .withMessage("Color must be at least 3 characters long"),
  body("vehicles.plate")
    .isLength({ min: 3 })
    .withMessage("Plate must be at least 3 characters long"),
  body("vehicles.capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),
  body("vehicles.vehicleType")
    .isIn(["moto", "car", "auto"])
    .withMessage("Type must be one of the following: moto, car, auto"),
];

const captionloginValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = { captainValidations, captionloginValidation };

// "moto", "car", "auto";
