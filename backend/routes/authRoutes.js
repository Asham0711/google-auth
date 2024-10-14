const express = require("express");
const passport = require("passport");
const { signup, signin, me } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth.middleware");

const router = express.Router();

// Local sign up and sign in
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", isAuthenticated, me);
// Google sign in
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    // Successful authentication
    const { token } = req.user; // Get token from user object
    // Set token in HTTP-only cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "Strict",
    };
    res.cookie("token", token, options);

    // Redirect to your frontend URL (without exposing token in URL)
    res.redirect("http://localhost:5173/");
  }
);

module.exports = router;
