productCtl = {};

const Product = require("../models/Products");

productCtl.findProduct = async (req, res) => {
  const { idProduct } = req.body;
  const product = await Product.findById(idProduct);
  res.json(product);
};

productCtl.modifyStrock = async (req, res) => {
  const { bagList } = req.body;
  for (let i = 0; i < bagList.length; i++) {
    await Product.findByIdAndUpdate(
      { _id: bagList[i].idProduct },
      {
        $inc: { stock: -bagList[i].cuantity },
      }
    );
  }
  res.json(bagList);
};

module.exports = productCtl;
