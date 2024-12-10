const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: String,
  organization: String,
  contact: String,
  image: String,
});

const UserModel = mongoose.model("User", userschema);

module.exports = UserModel;
