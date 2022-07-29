const userGoogleLogin = async (req, res) => {
  try {
    res.send("Hello");
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = userGoogleLogin;
