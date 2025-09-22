const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("Required fields are missing");
  }

  try {
    const user = await new userModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw new Error("Error creating user", error);
  }
};
