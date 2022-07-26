const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: validator.isMobilePhone,
      message: "Please enter a phone number",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "email is not a valid email",
    },
  },
  image: {
    type: String,
    contentType: "image/*",
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
