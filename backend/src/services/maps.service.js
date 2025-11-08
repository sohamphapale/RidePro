const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const apikey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apikey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceTimeSerice = async (origin, destination) => {
  if (!origin || !destination) {
    throw new error("Origin and destination are required");
  }
  const apikey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apikey}`;
  try {
    const response = await axios.get(url);
    console.log("====================================");
    console.log(response.data);
    console.log("====================================");
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "NOT_FOUND") {
        return response.data.rows[1].elements[0];
      }
      return response.data.rows[0].elements[0];
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.getSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }
  const apikey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apikey}`;
  try {
    const response = await axios.get(url);
    return response.data.predictions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  console.log(ltd, lng, radius);

  //radius in km

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[20.007056046704097, 73.73250754147504], radius / 6371],
      },
    },
  });


  return captains;
};
