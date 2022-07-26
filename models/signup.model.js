const mongoose = require("mongoose");
const validator = require("validator");

const SignupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "email is not a valid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Signup", SignupSchema);
