const { Router } = require("express");
const router = Router();

const {
  findProduct,
  modifyStrock,
} = require("../controllers/productController");

router.route("/findProduct").post(findProduct);
router.route("/productStock").put(modifyStrock);

module.exports = router;
