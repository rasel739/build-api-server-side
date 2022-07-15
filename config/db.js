const mongoose = require("mongoose");

const config = require("../config/config");

const dbUrl = config.db.url;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((error) => {
    console.log("Database connection failed", error);
    process.exit(1);
  });
