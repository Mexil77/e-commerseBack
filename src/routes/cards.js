const { Router } = require("express");
const router = Router();

const {
  addCard,
  updateCard,
  deleteCard,
} = require("../controllers/cardController");

router.route("/").post(addCard).put(updateCard).delete(deleteCard);

module.exports = router;
