const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger-outputfile.json");
const passport = require("passport");
const userRouter = require("./routes/users.route");
const singupRouter = require("./routes/signup.route");
const loginUser = require("./routes/login.route");
const resetPassword = require("./routes/passwordreset.route");
const config = require("./config/config");
require("./middleware/passport.middleware");
require("./config/db");
const jwt = require("jsonwebtoken");
const { application } = require("express");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
require("./middleware/passport");

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    const { _id, email } = req.user;
    const payload = {
      id: _id,
      email: email,
    };

    const token = jwt.sign(payload, config.secret_jwt.secret_key, {
      expiresIn: "1d",
    });

    // res.status(200).json({
    //   message: "successfully logged in",
    //   user: email,
    //   token: `Bearer ${token}`,
    // });

    res.redirect(`http://localhost:3000/v1/${token}/${email}`);
  }
);

app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
app.use("/user-signup", singupRouter);
app.use("/login-user", loginUser);
app.use("/reset-password", resetPassword);
//get server home page
app.get("/", (req, res) => {
  // #swagger.ignore = true
  res.sendFile(__dirname + "/./views/index.html");
});

//routes not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found Routes" });
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: "Sumthing wrong Not Found File!" });
});

module.exports = app;
