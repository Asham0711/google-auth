const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type:String, required: true},
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  password: { type: String },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
