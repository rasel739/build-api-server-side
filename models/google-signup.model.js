const mongoose = require("mongoose");
const GoogleSignup = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  googleId: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("GoogleSignup", GoogleSignup);
module.exports = User;
