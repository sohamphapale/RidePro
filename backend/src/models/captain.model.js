const mongoose = require("mongoose");
const becrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "firstname must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "lastname must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicles: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["moto", "car", "auto"],
    },
  },
  location: {
    lng: {
      type: Number,
    },
    ltd: {
      type: Number,
    },
  },
});

// generate auth token
captainSchema.methods.generateAuthToken = function () {
  const token = JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

// compare password
captainSchema.methods.comparePassword = async function (password) {
  return await becrypt.compare(password, this.password);
};
// hash password
captainSchema.statics.hashPassword = async function (password) {
  return await becrypt.hash(password, 10);
};

captainSchema.methods.toJSON = function () {
  const captainObject = this.toObject();
  delete captainObject.password;
  return captainObject;
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
