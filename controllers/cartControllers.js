const {
    getCart
} = require('../models/cartModels');
const asyncHandler = require('express-async-handler');

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

module.exports = {
    cartItems
}