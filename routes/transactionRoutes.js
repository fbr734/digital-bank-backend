const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  transfer,
  transactionHistory
} = require("../controllers/transactionController");

router.post("/transfer", auth, transfer);

router.get("/history", auth, transactionHistory);

module.exports = router;