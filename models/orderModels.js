const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const asyncHandler = require('express-async-handler');

const postOrder = asyncHandler(async (fields) => {
    const response = await prisma.orders.create(
        {
            data : {
                customer_id: fields.id,
                shipping_address: fields.shipping_address,
                contact_no: fields.contact
            }
        }
    )
    await prisma.$disconnect()
    return response;
})

const postOrderDetails = asyncHandler(async(fields) => {
    const response = await prisma.order_details.create(
        {
            data : {
                order_id: fields.order_id,
                product_id: fields.product_id,
                quantity: fields.quantity,
                total_amount: fields.total_amount
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const getUserCartItems = asyncHandler(async(id) => {
    const response = await prisma.cart_details.findMany(
        {
            where : {
                user_id: id
            },
            select : {
                quantity: true,
                total_amount: true,
                product_id: true
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const updateTotal = asyncHandler(async(id, total) => {
    const response = await prisma.orders.update(
        {
            where : {
                id
            },
            data : {
                total_amount: total
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

module.exports = {
    postOrder,
    postOrderDetails,
    getUserCartItems,
    updateTotal
}