const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { name: String, lastName: String, secondLastName: String },
    birthDay: Object,
    phone: String,
    email: String,
    password: String,
    directions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Direction" }],
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    wishLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "WishList" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    bag: [Object],
    stripeId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
