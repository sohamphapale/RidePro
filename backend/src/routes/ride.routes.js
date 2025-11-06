const express = require("express");
const { checkValidation } = require("./validations/checkValidation");
const { createRide, getFare } = require("../controllers/ride.controller");
const { rideCreateArr, getFareArr } = require("./validations/ride.validation");

const { authUser } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create", authUser, rideCreateArr, checkValidation, createRide);
router.get("/get-fare", authUser, getFare);

module.exports = router;
