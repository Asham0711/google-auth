const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Sign up (local)
exports.signup = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    if( !name || !username || !email || !password){
      return res.status(401).json({
        success:false,
        message:'All fields are required'
      })
    }
    const user = await User.findOne({email});
    if(user){
      return res.status(402).json({
        success:false,
        message:'User already exists'
      })
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({name, username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ 
      success:true,
      message: "User created",
      newUser
    });
  } catch (err) {
    console.log("Error while signup -> ", err.message);
    res.status(500).json({ 
      success:false,
      message:err.message,
      error: err.message 
    });
  }
};

// Sign in (local)
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "72h",
      }
    );

    user.token = token;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
        message: `User Login Success`,
      });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get user from token in cookie
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      token: user.token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
