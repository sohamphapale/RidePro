const mongoose = require("mongoose");
const becrypt = require("bcrypt");
const JWT = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  soketId: {
    type: String,
  },
});


// generate auth token
userSchema.methods.generateAuthToken = function (){
    const token = JWT.sign({_id: this._id}, process.env.JWT_SECRET,)
    return token;
}
// compare password 
userSchema.methods.comparePassword = async function (password){
    return await becrypt.compare(password, this.password);
}
// hash password
userSchema.statics.hashPassword = async function (password){
    return await becrypt.hash(password, 10);
} 

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;