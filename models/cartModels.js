const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const asyncHandler = require('express-async-handler');

const getCart = asyncHandler(async (id) => {
    const response = await prisma.cart.findMany(
        {
            where: 
            {
                id
            }
        }
    )
    await prisma.$disconnect();
    return response; 
})

module.exports = {
    getCart
}