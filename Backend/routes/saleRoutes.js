const express = require("express");
const {
  recordSale,
  confirmPayment,
  getTopSoldMedicines,
  getTotalSalesCurrentMonth,
} = require("../controllers/saleController");
const isOwner = require("../middlewares/ownerMiddleware");
const router = express.Router();

// Route to record a sale
router.post("/record", isOwner, recordSale);

// Route to confirm payment
router.post("/confirm", isOwner, confirmPayment);

router.get("/top-sold", isOwner, getTopSoldMedicines);

router.get("/current-month", isOwner, getTotalSalesCurrentMonth);

module.exports = router;
