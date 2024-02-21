const {
  getCart,
  postCart,
  putCart,
  deleteCartItem,
} = require("../models/cartModels");
const asyncHandler = require("express-async-handler");
const { getProductById } = require("../models/productModels");

const cartItems = asyncHandler(async (req, res) => {
  const id = parseInt(req.id);
  const result = await getCart(id);
  return res.status(200).json({
    status: 200,
    message: "Your cart:",
    data: result,
  });
});

const addToCart = asyncHandler(async (req, res) => {
  const product = parseInt(req.body.product_id);
  const id = parseInt(req.id);
  const productPrice = await getProductById(product);
  const amount = productPrice.product_price;
  const data = {
    product_id: product,
    total_amount: amount,
    user_id: id,
  };
  const result = await postCart(data);
  return res.status(200).json({
    status: 200,
    message: "Item added to cart",
  });
});

const updateCart = asyncHandler(async (req, res) => {
  const quantity = parseInt(req.body.quantity);
  const id = parseInt(req.body.cart_id);
  const product = await getProductById(parseInt(req.body.product_id));
  const totalAmount = quantity * product.product_price;
  const result = await putCart({ quantity, totalAmount, id });
  return res.status(200).json({
    status: 200,
    message: "Cart details updated successfully",
    data: result,
  });
});

const deleteCart = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await deleteCartItem(id);
  return res.status(200).json({
    status: 200,
    message: "Item deleted from cart",
  });
});

module.exports = {
  cartItems,
  addToCart,
  updateCart,
  deleteCart,
};
