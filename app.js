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

require("./config/db");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
require("./middleware/passport");

app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
app.use("/usersignup", singupRouter);
app.use("/loginUser", loginUser);
app.use("/resetPassword", resetPassword);
//get server home page
app.get("/", (req, res) => {
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
