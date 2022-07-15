const cloudinary = require("cloudinary").v2;
const envConfing = require("../config/config");

cloudinary.config({
  cloud_name: envConfing.cloudinary.cloud_name,
  api_key: envConfing.cloudinary.api_key,
  api_secret: envConfing.cloudinary.api_secret,
});

module.exports = cloudinary;
