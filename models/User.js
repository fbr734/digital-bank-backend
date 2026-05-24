const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    bvn: String,

    nin: String,

    verified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);