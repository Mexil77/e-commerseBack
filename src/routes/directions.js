const { Router } = require("express");

const router = Router();

const {
  addDirection,
  updateDirection,
  deleteDirection,
} = require("../controllers/directionController");

router
  .route("/")
  .post(addDirection)
  .put(updateDirection)
  .delete(deleteDirection);

module.exports = router;
