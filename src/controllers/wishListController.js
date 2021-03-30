wishListCtl = {};

const WishList = require("../models/WishLists");

wishListCtl.createWishList = async (req, res) => {
  const { name } = req.body;
  const newWishList = new WishList({
    name,
    productList: [],
  });
  await newWishList.save();
  res.json({ idWishList: newWishList._id });
};

wishListCtl.deleteWishList = async (req, res) => {
  const { idWishList } = req.query;
  await WishList.findByIdAndDelete(idWishList);
  res.json({ message: "Wish List deleted" });
};

wishListCtl.addProductToWishList = async (req, res) => {
  const { idWishList, idProduct } = req.body;
  await WishList.findByIdAndUpdate(idWishList, {
    $push: { productList: idProduct },
  });
  res.json({ message: "product added" });
};

wishListCtl.dropProductToWishList = async (req, res) => {
  const { idWishList, idProduct } = req.body;
  await WishList.findByIdAndUpdate(idWishList, {
    $pull: { productList: idProduct },
  });
  res.json({ message: "product pulled" });
};

wishListCtl.findProductInWishList = async (req, res) => {
  const { idWishList, idProduct } = req.body;
  const finded = await WishList.findOne({
    _id: idWishList,
    productList: idProduct,
  });
  if (!finded) {
    res.json({ finded: false });
  } else {
    res.json({ finded: true });
  }
};

module.exports = wishListCtl;
