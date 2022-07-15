const express = require("express");
const { createSignup } = require("../controllers/signup.controllers");
const router = express.Router();

router.post("/", createSignup);

module.exports = router;
