cardCtl = {};

const Card = require("../models/Cards");

cardCtl.addCard = async (req, res) => {
  const { name, stripeIdCard } = req.body;
  const newCard = new Card({
    name,
    stripeIdCard: stripeIdCard,
  });
  await newCard.save();
  res.json({ idCard: newCard._id });
};

cardCtl.updateCard = async (req, res) => {
  const { idCard, name, month, year } = req.body;
  await Card.findByIdAndUpdate(idCard, {
    name,
    month,
    year,
  });
  res.json({ message: "Card Updated" });
};

cardCtl.deleteCard = async (req, res) => {
  const { idCard } = req.query;
  await Card.findByIdAndDelete(idCard);
  res.json({ message: "Card deleted" });
};

module.exports = cardCtl;
