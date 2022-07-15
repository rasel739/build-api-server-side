const LoginModel = require("../models/signup.model");

const loginUser = async (req, res) => {
  try {
    const user = await LoginModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      res.status(401).json({
        message: "login not successfull",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "successfully logged in",
        user: user?.email,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = loginUser;
