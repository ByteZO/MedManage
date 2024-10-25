const Medicine = require("../models/medicine");
const Sale = require("../models/sale");

const recordSale = async (req, res) => {
  const { medicineName, unitsSold } = req.body;

  try {
    const medicine = await Medicine.findOne({ name: medicineName });

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    if (unitsSold > medicine.units) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const totalCost = unitsSold * medicine.price;

    res.status(200).json({
      medicineName: medicine.name,
      expiryDate: medicine.expiryDate,

      totalCost,
    });
  } catch (error) {
    res.status(500).json({ message: "Error recording sale", error });
  }
};

const confirmPayment = async (req, res) => {
  const { medicineName, unitsSold, totalCost } = req.body;

  try {
    const medicine = await Medicine.findOne({ name: medicineName });

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    if (unitsSold > medicine.units) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Update medicine units
    medicine.units -= unitsSold;
    await medicine.save();

    // Create a new sale record
    const sale = new Sale({
      medicineName,
      unitsSold,
      totalCost,
      expiryDate: medicine.expiryDate,
    });

    await sale.save();

    res.status(201).json({ message: "Payment confirmed", sale });
  } catch (error) {
    res.status(500).json({ message: "Error confirming payment", error });
  }
};

const getTopSoldMedicines = async (req, res) => {
  try {
    const topMedicines = await Sale.aggregate([
      {
        $group: {
          _id: "$medicineName",
          totalUnitsSold: { $sum: "$unitsSold" },
        },
      },
      {
        $sort: { totalUnitsSold: -1 }, // Sort by total units sold in descending order
      },
      {
        $limit: 2, // Limit to the top 2 medicines
      },
    ]);

    res.status(200).json(topMedicines);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving top sold medicines", error });
  }
};

const getTotalSalesCurrentMonth = async (req, res) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1); // Set to the first day of the month
  startOfMonth.setHours(0, 0, 0, 0); // Set time to midnight

  const endOfMonth = new Date(); // Current date and time

  try {
    const totalSales = await Sale.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth }, // Match sales in the current month
        },
      },
      {
        $group: {
          _id: {
            medicineName: "$medicineName",
            // You can also group by any other fields if necessary
          },
          totalUnitsSold: { $sum: "$unitsSold" },
          totalRevenue: { $sum: "$totalCost" },
        },
      },
      {
        $project: {
          _id: 0,
          medicineName: "$_id.medicineName",
          totalUnitsSold: 1,
          totalRevenue: 1,
        },
      },
    ]);

    res.status(200).json(totalSales.length > 0 ? totalSales : []);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving total sales for current month",
        error,
      });
  }
};

module.exports = {
  recordSale,
  confirmPayment,
  getTopSoldMedicines,
  getTotalSalesCurrentMonth,
};
