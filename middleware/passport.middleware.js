const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const config = require("../config/config");
const User = require("../models/signup.model");
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_signup.google_client_id,
      clientSecret: config.google_signup.google_client_secret,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ email: profile.emails[0].value }, function (err, user) {
        if (err) return cb(err, null);
        if (!user) {
          let newUser = new User({
            email: profile.emails[0].value,
            password: profile.id,
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// find session info using session id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
