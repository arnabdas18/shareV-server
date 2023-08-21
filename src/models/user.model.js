const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  displayPicture: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  myVideos: [],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
