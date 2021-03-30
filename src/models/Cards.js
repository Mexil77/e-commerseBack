const { Schema, model } = require("mongoose");

const CardSchema = new Schema(
  {
    name: String,
    stripeIdCard: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Card", CardSchema);
