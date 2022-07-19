const nodemailer = require("nodemailer");
const Signup = require("../models/signup.model");
const sendEmail = require("../utils/sendMail");

const createSignup = async (req, res) => {
  // #swagger.tags = ['User authentication']
  const subject = "Signup  email confirmation";
  const text =
    "Hello, Thank you for creating your Build API account.We look forward to readingyour posts and hope you will enjoy the space that we created for our customers.The  team";
  try {
    const newSignup = new Signup({
      email: req.body.email,
      password: req.body.password,
    });
    await newSignup.save();
    sendEmail(newSignup.email, subject, text);
    res.status(200).json({ singup: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createSignup };
