const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient
const asyncHandler = require('express-async-handler');

const homePageModel = asyncHandler(async (limit, offset) => {
    const response = await prisma.products.findMany(
        {
            skip: offset,
            take: limit
        }
    )
    await prisma.$disconnect();
    return response;
})

module.exports = homePageModel