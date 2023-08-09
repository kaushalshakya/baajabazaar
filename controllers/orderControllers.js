
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
    getRecentOrderDetails,
    deleteOrder
} = require('../models/orderModels');
const asyncHandler = require('express-async-handler');
const transporter = require('../nodemailer');

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
    console.log(id);
    const order = await getRecentOrder(id);
    console.log(order);
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
    const sendEmail = {
        from: '"BajaBazaar" <noreply@bajabazaar.com>',
        to: user.email,
        subject: 'Order Confirmation',
        text : `
        Dear ${user.first_name},

        Your order has been successfully placed.
        Order ID: ${order.id}
        Order Total: ${total}
        
        Thank you for shopping with us!
        `
    }

    const email = await transporter.sendMail(sendEmail);
    
    if(email){
        console.log("Message sent: %s", email.messageId);
    }else { 
        console.log('Error sending mail: ', email.error);
    }

    await emptyCartModel(id);

    return res.status(200).json(
        {
            status: 200,
            message: 'Your order has been stored successfully!'
        }
    )


})

const cancelOrder = asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    const user = await getCustomerById(req.id);
    const result = await deleteOrder(id);
    const sendEmail = {
        from: '"BajaBazaar" <noreply@bajabazaar.com>',
        to: user.email,
        subject: 'Order Cancellation',
        text : `
        Dear ${user.first_name},

        Your order has been cancelled.
        
        Thank you for shopping with us!
        `
    }

    const email = await transporter.sendMail(sendEmail);
    
    if(email){
        console.log("Message sent: %s", email.messageId);
    }else { 
        console.log('Error sending mail: ', email.error);
    }
    return res.status(200).json(
        {
            status: 200,
            message: 'Order cancelled'
        }
    )
})

module.exports = {
    viewOrderHistory,
    createOrder,
    recentOrder,
    cancelOrder
}