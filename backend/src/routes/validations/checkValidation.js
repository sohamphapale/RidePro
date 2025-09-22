const { validationResult } = require("express-validator");

// Middleware to check for validation errors
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};



module.exports = { checkValidation};
