const express = require("express");
const { checkValidation } = require("./validations/checkValidation");
const { createRide } = require("../controllers/ride.controller");
const { rideCreateArr } = require("./validations/ride.validation");

const { authUser } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/create", authUser, rideCreateArr, checkValidation, createRide);
module.exports = router;
