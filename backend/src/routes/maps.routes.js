const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware");
const { getCorrdinates, getDistanceTime  } = require("../controllers/maps.controller");

const { mapgetCorrdinatesArr, mapDistanceTimeArr } = require("./validations/map.validations");
const { checkValidation } = require("./validations/checkValidation");

router.get("/get-cordinates", mapgetCorrdinatesArr, checkValidation, authUser, getCorrdinates);

router.get("/get-distance-time", mapDistanceTimeArr,checkValidation, authUser, getDistanceTime )

module.exports = router;


