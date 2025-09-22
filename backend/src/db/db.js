const mongoose = require("mongoose");

const mongoURI = "mongodb://0.0.0.0/RidePro";

const connectToDB = async () => {
  
  await mongoose.connect(mongoURI);
  console.log("connect to Mongo successfully ");
};

module.exports = connectToDB;
