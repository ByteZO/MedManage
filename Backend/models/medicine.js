// models/medicine.js
const mongoose = require("mongoose");
// models/medicine.js
const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    units: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Compound unique index
medicineSchema.index({ name: 1, expiryDate: 1 }, { unique: true });

module.exports = mongoose.model("Medicine", medicineSchema);
