const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    discount: Number,
    categori: String,
    tax: Number,
    stock: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
