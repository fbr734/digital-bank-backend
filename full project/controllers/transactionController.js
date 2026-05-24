const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const { v4: uuidv4 } = require("uuid");

exports.transfer = async (req, res) => {
  try {

    const { receiverAccount, amount } = req.body;

    const sender = await Account.findOne({
      user: req.user.id
    });

    const receiver = await Account.findOne({
      accountNumber: receiverAccount
    });

    if (!receiver) {
      return res.status(404).json({
        message: "Receiver account not found"
      });
    }

    if (sender.balance < amount) {
      return res.status(400).json({
        message: "Insufficient funds"
      });
    }

    sender.balance -= amount;

    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = await Transaction.create({
      senderAccount: sender.accountNumber,
      receiverAccount: receiver.accountNumber,
      amount,
      transactionType: "TRANSFER",
      reference: uuidv4()
    });

    res.json({
      message: "Transfer successful",
      transaction
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.transactionHistory = async (req, res) => {
  try {

    const account = await Account.findOne({
      user: req.user.id
    });

    const history = await Transaction.find({
      $or: [
        { senderAccount: account.accountNumber },
        { receiverAccount: account.accountNumber }
      ]
    });

    res.json(history);

  } catch (error) {
    res.status(500).json(error);
  }
};
