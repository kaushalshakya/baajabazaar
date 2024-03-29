const {
  cartItems,
  addToCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartControllers");
const router = require("express").Router();

router.get("/", cartItems);
router.post("/", addToCart);
router.put("/", updateCart);
router.delete("/:id", deleteCart);

module.exports = router;
