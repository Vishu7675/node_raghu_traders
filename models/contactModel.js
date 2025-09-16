const mongoose = require("mongoose");

const contactSchmea = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the Contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the Email"],
    },
    phone: {
      type: String,
      required: [true, "Please add the Phone Number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchmea);
