const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const asyncHandler = require('express-async-handler');

const getCart = asyncHandler(async(user_id) => {
    const response = await prisma.cart_details.findMany(
        {
            where : {
                user_id
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const postCart = asyncHandler(async(fields) => {
    const response = await prisma.cart_details.create(
            {
            data: {
                user_id: fields.user_id,
                quantity: fields.quantity,
                product_id: fields.product_id,
                total_amount: fields.total_amount
            }
        }
      );
    await prisma.$disconnect();
    return response;
})

module.exports = {
    getCart,
    postCart
}