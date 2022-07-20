require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 5000,
  },
  db: {
    url: process.env.DB_URL,
  },
  nodeMailer: {
    service: process.env.NODE_MAILER_SERVICE,
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASS,
    from: process.env.NODE_MAILER_FROM,
  },
  secret_jwt: {
    secret_key: process.env.SECRET_KEY,
  },
};

module.exports = dev;
