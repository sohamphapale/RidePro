const express = require("express");
const { checkValidation } = require("./validations/checkValidation");
const {
  createRide,
  getFare,
  confirmRide,
  startRide,
  endRide,
} = require("../controllers/ride.controller");
const {
  rideCreateArr,
  getFareArr,
  startridearr,
  endridearr
} = require("./validations/ride.validation");

const { authUser, authCaptain } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create", authUser, rideCreateArr, checkValidation, createRide);
router.get("/get-fare", authUser, getFare);
router.post("/confirm", authCaptain, confirmRide);
router.get("/start-ride", authCaptain, startridearr, startRide);
router.get("/end-ride", authCaptain, endridearr, endRide);

module.exports = router;
