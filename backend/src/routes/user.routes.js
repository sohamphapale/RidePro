const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser } = require("../controllers/user.controllers");

const userArr=[
    body('email').isEmail().withMessage('Invalid email '),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
]

router.post('/register', userArr, registerUser);


module.exports = router;
