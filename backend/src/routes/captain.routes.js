const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
// validations
const {
  captainValidations,
  captionloginValidation,
} = require("./validations/captain.validation");
const { checkValidation } = require("./validations/checkValidation");
// controllers
const {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
} = require("../controllers/captain.controller");
const { authCaptain } = require("../middlewares/auth.middleware");

// Captain Registration captains/register
router.post("/register", captainValidations, checkValidation, registerCaptain); // ✅ function
module.exports = router;

// Captain login captains/login
router.post("/login", captionloginValidation, checkValidation, loginCaptain); // ✅ function

// Captain profile captains/profile
router.get("/profile", authCaptain, getCaptainProfile); // ✅ function


// Captain profile captains/logout
router.get("/logout", authCaptain, logoutCaptain); // ✅ function


