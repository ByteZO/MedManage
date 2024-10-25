const express = require("express");
const {
  auditMedicines,
  getMedicines,
  getExpiredMedicines
} = require("../controllers/medicineController");
const isOwner = require("../middlewares/ownerMiddleware");

const router = express.Router();

// Admin-only route for auditing medicines
router.post("/audit", isOwner, auditMedicines);

// Route to fetch all medicines
router.get("/", isOwner, getMedicines); 

// Route to fetch all expired medicines
router.get('/expired', isOwner, getExpiredMedicines); 

module.exports = router;
