const { Router } = require("express");
const router = Router();

const {
  createWishList,
  deleteWishList,
  addProductToWishList,
  findProductInWishList,
  dropProductToWishList,
} = require("../controllers/wishListController");

router.route("/").post(createWishList).delete(deleteWishList);
router.route("/product").put(addProductToWishList).post(findProductInWishList);
router.route("/dropProduct").put(dropProductToWishList);

module.exports = router;
