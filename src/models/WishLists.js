const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const WishListSchema = new Schema(
  {
    name: String,
    productList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("WishList", WishListSchema);
