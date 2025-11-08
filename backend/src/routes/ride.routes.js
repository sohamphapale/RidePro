const express = require("express");
const { checkValidation } = require("./validations/checkValidation");
const { createRide, getFare, confirmRide } = require("../controllers/ride.controller");
const { rideCreateArr, getFareArr } = require("./validations/ride.validation");

const { authUser, authCaptain } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create", authUser, rideCreateArr, checkValidation, createRide);
router.get("/get-fare", authUser, getFare);
router.post("/confirm", authCaptain, confirmRide);
module.exports = router;
