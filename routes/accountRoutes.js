const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createAccount,
  checkBalance
} = require("../controllers/accountController");

router.post("/create", auth, createAccount);

router.get("/balance", auth, checkBalance);

module.exports = router;