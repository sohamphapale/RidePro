const { createRideService, getFare } = require("../services/ride.service");

module.exports.createRide = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await createRideService({
      user: req.user,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const { pickup, destination } = req.query;
  try {
    const fare = await getFare(pickup, destination);
    res.status(200).json(fare);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
