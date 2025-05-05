const mongoose = require("mongoose");

const userSchmea = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email is already exist"],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchmea);
