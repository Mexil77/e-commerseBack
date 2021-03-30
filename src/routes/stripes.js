const { Router } = require("express");
const router = Router();

const {
  getCard,
  createAndSetCard,
  deleteCard,
  payOrderWithCard,
} = require("../controllers/stripeController");

router.route("/").get(getCard).post(createAndSetCard).delete(deleteCard);
router.route("/payCard").post(payOrderWithCard);

module.exports = router;
