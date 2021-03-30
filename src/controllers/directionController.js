directionCtl = {};

const Direction = require("../models/Directions");

directionCtl.addDirection = async (req, res) => {
  const {
    fullName,
    streetNumber,
    CP,
    state,
    city,
    suburb,
    phoneNumber,
    instructions,
  } = req.body;
  const newDirection = new Direction({
    fullName,
    streetNumber,
    CP,
    state,
    city,
    suburb,
    phoneNumber,
    instructions,
  });
  await newDirection.save();
  res.json({ idDirection: newDirection._id });
};

directionCtl.updateDirection = async (req, res) => {
  const {
    idDirection,
    fullName,
    streetNumber,
    CP,
    state,
    city,
    suburb,
    phoneNumber,
    instructions,
  } = req.body;
  await Direction.findByIdAndUpdate(idDirection, {
    fullName,
    streetNumber,
    CP,
    state,
    city,
    suburb,
    phoneNumber,
    instructions,
  });
  res.json({ message: "Direction updated" });
};

directionCtl.deleteDirection = async (req, res) => {
  const { idDirection } = req.query;
  await Direction.findByIdAndDelete(idDirection);
  res.json({ mesage: "direction deleted" });
};

module.exports = directionCtl;
