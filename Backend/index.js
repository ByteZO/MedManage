const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const medicineRoutes = require("./routes/medicineRoutes");
const authRoutes = require("./routes/authRoutes");
const saleRoutes = require("./routes/saleRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database connection error:", error));

app.use("/auth", authRoutes);

// Use the medicine routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/sales", saleRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
