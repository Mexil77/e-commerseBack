const { Router } = require("express");
const router = Router();

const { addOrder } = require("../controllers/orderController");

router.route("/").post(addOrder);

module.exports = router;
