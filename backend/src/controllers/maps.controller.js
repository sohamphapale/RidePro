const {
  getAddressCoordinate,
  getDistanceTimeSerice,
  getSuggestions,
} = require("../services/maps.service");

module.exports.getCorrdinates = async (req, res, next) => {
  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Corrdinates not found " });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const { origin, destination } = req.query;
    const destanceTime = await getDistanceTimeSerice(origin, destination);
    res.status(200).json(destanceTime);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  const { input } = req.query;
  try {
    const suggestion = await getSuggestions(input);
    res.status(200).json(suggestion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
