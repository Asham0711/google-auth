const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, displayName, emails } = profile;
        // Check if user already exists
        let user = await User.findOne({ googleId: id });

        const generatedUsername = emails[0]?.value
          ?.split("@")[0]
          .toLowerCase()
          .replace(/[^\w]/g, "");

        if (user) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "72h", // Set expiration time as needed
          });

          user.token = token;
          return done(null, user);
        } else {
          // Create a new user if not found
          const newUser = new User({
            googleId: id,
            name: displayName,
            email: emails[0].value,
            username:
              generatedUsername ??
              displayName
                ?.split(" ")
                ?.join("-")
                ?.toLowerCase()
                ?.replace(/[^\w]/g, ""),
          });

          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "72h", // Set expiration time as needed
          });

          newUser.token = token;
          await newUser.save();

          return done(null, newUser);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user._id); // Serialize the user ID to the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Use await instead of callback
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
