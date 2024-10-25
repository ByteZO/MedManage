const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    medicineName: { type: String, required: true },
    unitsSold: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sale", saleSchema);
