orederCtl = {};

const Order = require("../models/Orders");

orederCtl.addOrder = async (req, res) => {
  const {
    bagList,
    totalAmount,
    payForm,
    direction,
    stripeIdPaymentIntent,
  } = req.body;

  const productBagList = [];

  for (let i = 0; i < bagList.length; i++) {
    productBagList.push({
      product: bagList[i].idProduct,
      cuantity: bagList[i].cuantity,
    });
  }

  const newOrder = new Order({
    bagList: productBagList,
    totalAmount,
    payForm,
    direction,
    stripeIdPaymentIntent,
  });

  await newOrder.save();

  res.json({ idOrder: newOrder._id });
};

module.exports = orederCtl;
