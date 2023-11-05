const homePageModel = require("../models/homePageModel");
const asyncHandler = require("express-async-handler");

const homePage = asyncHandler(async (req, res) => {
  const products = await homePageModel();
  return res.status(200).json({
    status: 200,
    message: "Welcome to BajaBazaar",
    products: products ? products : "No products available",
  });
});

module.exports = homePage;
