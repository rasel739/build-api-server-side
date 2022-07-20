const nodemailer = require("nodemailer");
const Signup = require("../models/signup.model");
const sendEmail = require("../utils/sendMail");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createSignup = async (req, res) => {
  // #swagger.tags = ['User authentication']
  const { email, password } = req.body;
  const subject = "Signup  email confirmation";
  const text =
    "Hello, Thank you for creating your Build API account.We look forward to readingyour posts and hope you will enjoy the space that we created for our customers.The  team";
  try {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const newSignup = new Signup({
        email: email,
        password: hash,
      });
      await newSignup.save();
      sendEmail(newSignup.email, subject, text);
      res.status(200).json({ singup: true });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createSignup };
