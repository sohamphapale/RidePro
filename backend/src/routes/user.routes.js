const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser, getUserProfile, loginUser, logoutUser } = require("../controllers/user.controllers");
const { loginArr, userArr, checkValidation } = require("./validation/user.validation");
const { authUser } = require("../middlewares/auth.middleware");

// register user route
router.post("/register", userArr,checkValidation, registerUser);

// login user route
router.post("/login", loginArr,checkValidation, loginUser);
router.get("/profile",authUser, getUserProfile ); 

//logout user route
router.get("/logout", authUser, logoutUser);


module.exports = router;
