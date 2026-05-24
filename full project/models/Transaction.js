const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    senderAccount: String,

    receiverAccount: String,

    amount: Number,

    transactionType: String,

    status: {
      type: String,
      default: "SUCCESS"
    },

    reference: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);