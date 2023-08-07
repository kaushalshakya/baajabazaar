const {
    getCart,
    postCart
} = require('../models/cartModels');
const asyncHandler = require('express-async-handler');
const { getProductById } = require('../models/productModels');

const cartItems = asyncHandler(async (req, res) => {
    const id = parseInt(req.id);
    const result =  await getCart(id);
    return res.status(200).json(
        {
            status: 200,
            message: 'Your cart:',
            data: result
        }
    )
})

const addToCart = asyncHandler(async (req, res) => {
    const quantity = parseInt(req.body.quantity);
    const product = parseInt(req.body.product_id);
    const id = parseInt(req.id);
    const productPrice = await getProductById(product);
    const amount = quantity * productPrice.product_price;
    const data = {
        quantity: quantity,
        product_id: product,
        total_amount: amount,
        user_id: id
    }
    const result = await postCart(data);
    return res.status(200).json(
        {
            status: 200,
            message: 'Item added to cart'
        }
    )
})

module.exports = {
    cartItems,
    addToCart
}