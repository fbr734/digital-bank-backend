const Account = require("../models/Account");

exports.createAccount = async (req, res) => {
  try {

    const existing = await Account.findOne({
      user: req.user.id
    });

    if (existing) {
      return res.status(400).json({
        message: "Customer already has an account"
      });
    }

    const accountNumber =
      Math.floor(1000000000 + Math.random() * 9000000000);

    const account = await Account.create({
      user: req.user.id,
      accountNumber,
      balance: 15000
    });

    res.json({
      message: "Account created successfully",
      account
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.checkBalance = async (req, res) => {
  try {

    const account = await Account.findOne({
      user: req.user.id
    });

    res.json({
      balance: account.balance
    });

  } catch (error) {
    res.status(500).json(error);
  }
};