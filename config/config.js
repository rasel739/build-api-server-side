require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 5000,
  },
  db: {
    url: process.env.DB_URL || "http://localhost:5000",
  },
  nodeMailer: {
    service: process.env.NODE_MAILER_SERVICE,
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASS,
    from: process.env.NODE_MAILER_FROM,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};

module.exports = dev;
