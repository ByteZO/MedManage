// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

// Signup function for regular users only
const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role: "user" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in registration", error });
  }
};

// Login function for both admin and users
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token with the user's role
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY);

    // Send the token in the Authorization header
    res.setHeader("Authorization", `Bearer ${token}`);

    // Send the response body with a success message
    res.status(200).json({
      message: "Login successful",
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in login", error });
  }
};

module.exports = { signup, login };
