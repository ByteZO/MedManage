// routes/authRoutes.js
const express = require("express");
const { signup, login } = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/ownerMiddleware");

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
});

module.exports = router;
