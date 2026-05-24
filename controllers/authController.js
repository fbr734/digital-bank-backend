const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { verifyBVN, verifyNIN } = require("../services/nibssService");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, bvn, nin } = req.body;

    let verified = false;

    if (bvn) {
      const bvnResponse = await verifyBVN(bvn);

      if (bvnResponse.success) {
        verified = true;
      }
    }

    if (nin) {
      const ninResponse = await verifyNIN(nin);

      if (ninResponse.success) {
        verified = true;
      }
    }

    if (!verified) {
      return res.status(400).json({
        message: "BVN or NIN verification failed"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bvn,
      nin,
      verified: true
    });

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Onboarding successful",
      token
    });

  } catch (error) {
    res.status(500).json(error);
  }
};