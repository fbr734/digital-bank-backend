require("dotenv").config({path: require('path').resolve(__dirname,'/.env')});

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/account", accountRoutes);

app.use("/api/transaction", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Digital Bank API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});