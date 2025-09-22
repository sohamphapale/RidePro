const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerUser,
  getUserProfile,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const { loginArr, userArr } = require("./validations/user.validation");
const { authUser } = require("../middlewares/auth.middleware");
const { checkValidation } = require("./validations/checkValidation");

// register user route
router.post("/register", userArr, checkValidation, registerUser);

// login user route
router.post("/login", loginArr, checkValidation, loginUser);
router.get("/profile", authUser, getUserProfile);

//logout user route
router.get("/logout", authUser, logoutUser);

module.exports = router;
