const express = require("express");
const router = express.Router();
const userGoogleLogin = require("../controllers/google-login.controllers");
router.get("/", userGoogleLogin);

module.exports = router;
