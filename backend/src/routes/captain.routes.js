const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { captainValidations } = require("./validations/captain.validation");
const { checkValidation } = require("./validations/checkValidation");
const { registerCaptain } = require("../controllers/captain.controller");



// Captain Registration captains/register
router.post("/register", captainValidations, checkValidation, registerCaptain); // ✅ function
module.exports = router;
