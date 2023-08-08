
const { getCustomerById } = require('../models/customerModels');
const {
    postOrder,
    getUserCartItems,
    postOrderDetails,
    updateTotal
} = require('../models/orderModels');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const id = req.id;

    const user = await getCustomerById(id);
    console.log(parseInt(user.contact));

    const fields = {
        id,
        shipping_address: req.body.shipping_address,
        contact: parseInt(user.contact)
    }
    
    const order = await postOrder(fields);

    const cartDetails = await getUserCartItems(id);

    var total = 0;
    for (let i = 0; i < cartDetails.length; i++){
       console.log(cartDetails[i]);
       const fields = {
        order_id: order.id,
        product_id: cartDetails[i].product_id,
        quantity: cartDetails[i].quantity,
        total_amount: cartDetails[i].total_amount
       }
       total += cartDetails[i].total_amount;
       const response = await postOrderDetails(fields);
    }
    
    const updatOrderTotal = await updateTotal(order.id, total);

    return res.status(200).json(
        {
            status: 200,
            message: 'Your order has been stored successfully!'
        }
    )


})

module.exports = {
    createOrder
}