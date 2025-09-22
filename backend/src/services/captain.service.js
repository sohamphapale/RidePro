const captainModel = require("../models/captain.model");

// captain.service.js
module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  try {
    console.log("Creating captain with:");

    const captain = await new captainModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicles: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });
    const savedCaptain = await captain.save();
    return savedCaptain;
  } catch (error) {
    console.error("Error creating captain:", error); // log full error
    res.status(400).send("Error creating captain: " + error.message);
  }
};
