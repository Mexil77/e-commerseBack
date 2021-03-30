const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const OrdersSchema = new Schema(
  {
    bagList: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        cuantity: Number,
      },
    ],
    totalAmount: Number,
    payForm: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
    direction: { type: mongoose.Schema.Types.ObjectId, ref: "Direction" },
    stripeIdPaymentIntent: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", OrdersSchema);
