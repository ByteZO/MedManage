// controllers/medicineController.js
const Medicine = require("../models/medicine");
const auditMedicines = async (req, res) => {
  const { name, units, expiryDate, price } = req.body;

  try {
    // Check for medicine with the same name and expiry date
    let medicine = await Medicine.findOne({
      name,
      expiryDate: new Date(expiryDate),
    });

    if (medicine) {
      // If found, update the units
      medicine.units += units;
      await medicine.save();
    } else {
      // If not found, create a new medicine entry
      medicine = new Medicine({
        name,
        units,
        expiryDate: new Date(expiryDate),
        price,
      });
      await medicine.save();
    }

    res
      .status(201)
      .json({ message: "Medicine audited successfully", medicine });
  } catch (error) {
    res.status(500).json({ message: "Error auditing medicine", error });
  }
};
// Function to get all medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medicines", error });
  }
};

// Function to get all expired medicines
const getExpiredMedicines = async (req, res) => {
  try {
    const currentDate = new Date();
    const expiredMedicines = await Medicine.find({
      expiryDate: { $lt: currentDate },
    });
    res.status(200).json(expiredMedicines);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching expired medicines", error });
  }
};

module.exports = { auditMedicines, getMedicines, getExpiredMedicines };
