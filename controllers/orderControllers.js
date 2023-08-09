
const { getCustomerById } = require('../models/customerModels');
const {
    postOrder,
    getUserCartItems,
    postOrderDetails,
    updateTotal,
    getUserOrders,
    getOrderDetails,
    emptyCartModel,
    getRecentOrder,
    getRecentOrderDetails
} = require('../models/orderModels');
const asyncHandler = require('express-async-handler');

const viewOrderHistory = asyncHandler(async (req, res) => {
    const id = req.id;
    const order = await getUserOrders(id);
    const orderDetails = await getOrderDetails(order.id);
    return res.status(200).json(
        {
            status: 200,
            message: 'Your purchase history',
            orderDetails: orderDetails
        }
    )
})

const recentOrder = asyncHandler(async (req, res) => {
    const id = req.id;
    const order = await getRecentOrder(id);
    const orderDetails = await getRecentOrderDetails(order.id);
    return res.status(200).json(
        {
            status: 200,
            message: 'Your order:',
            data: orderDetails
        }
    )
})

const createOrder = asyncHandler(async (req, res) => {
    const id = req.id;

    const user = await getCustomerById(id);
    const fields = {
        id,
        shipping_address: req.body.shipping_address,
        contact: user.contact
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
        total_amount: cartDetails[i].total_amount,
        customer_id: id
       }
       total += cartDetails[i].total_amount;
       const response = await postOrderDetails(fields);
    }
    
    await updateTotal(order.id, total);
    await emptyCartModel(id);

    return res.status(200).json(
        {
            status: 200,
            message: 'Your order has been stored successfully!'
        }
    )


})

module.exports = {
    viewOrderHistory,
    createOrder,
    recentOrder
}