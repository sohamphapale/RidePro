const express = require("express");
const { checkValidation } = require("./validations/checkValidation");
const router = express.Router();

router.get("/create", rideCreateArr, checkValidation,  getCorrdinates);
