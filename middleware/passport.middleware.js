const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const config = require("../config/config");
const User = require("../models/google-signup.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_signup.google_client_id,
      clientSecret: config.google_signup.google_client_secret,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id }, function (err, user) {
        return cb(err, user);

        if (!user) {
          let newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
          });
          newUser.save();
          return cb(null, newUser);
        } else {
          // if we find an user just return return user
          return cb(null, user);
        }
      });
    }
  )
);
