const { Router } = require("express");
const router = Router();

const {
  signUpUser,
  findUser,
  getUser,
  updateInfoUser,
  signOutUser,
  addBag,
  getBag,
  deleteBagItem,
  updateBag,
  deleteBag,
  addOrder,
  addDirection,
  dropDirection,
  addCard,
  dropCard,
  addWishList,
  dropWishList,
} = require("../controllers/userController");

router.route("/").post(signUpUser).get(signOutUser);
router.route("/user").get(getUser).put(updateInfoUser);
router.route("/findUser").post(findUser);
router.route("/bag").put(addBag).get(getBag).delete(deleteBagItem);
router.route("/bagUpdate").put(updateBag);
router.route("/bagDeleted").delete(deleteBag);
router.route("/order").put(addOrder);
router.route("/direction").put(addDirection);
router.route("/dropDirection").put(dropDirection);
router.route("/card").put(addCard);
router.route("/dropCard").put(dropCard);
router.route("/wishList").put(addWishList);
router.route("/dropWishList").put(dropWishList);

module.exports = router;
