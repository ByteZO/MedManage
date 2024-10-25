// middlewares/ownerMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

const isOwner = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from header
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an owner." });
    }

    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
};

module.exports = isOwner;
