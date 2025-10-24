const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware");
const { getCorrdinates, getDistanceTime, getAutoCompleteSuggestions} = require("../controllers/maps.controller");

const { mapgetCorrdinatesArr, mapDistanceTimeArr, mapsuggestionsArr } = require("./validations/map.validations");
const { checkValidation } = require("./validations/checkValidation");

router.get("/get-cordinates", mapgetCorrdinatesArr, checkValidation, authUser, getCorrdinates);

router.get("/get-distance-time", mapDistanceTimeArr,checkValidation, authUser, getDistanceTime );


router.get("/get-suggestions", mapsuggestionsArr,checkValidation, authUser, getAutoCompleteSuggestions );


module.exports = router;


