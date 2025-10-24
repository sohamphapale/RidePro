const { query } = require("express-validator");

const mapgetCorrdinatesArr = [
  query("address")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid address"),
];

const mapDistanceTimeArr = [
  query("origin").isString().isLength({ min: 3 }).withMessage("Invalid origin"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination"),
];

const mapsuggestionsArr = [
  query("input").isString().isLength({ min: 3 }).withMessage("Invalid input"),
];

module.exports = { mapgetCorrdinatesArr, mapDistanceTimeArr, mapsuggestionsArr };
