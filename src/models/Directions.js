const { Schema, model } = require("mongoose");

const DirectionSchema = new Schema(
  {
    fullName: String,
    streetNumber: String,
    CP: Number,
    state: String,
    city: String,
    suburb: String,
    phoneNumber: Number,
    instructions: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Direction", DirectionSchema);
