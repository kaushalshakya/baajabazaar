const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const asyncHandler = require('express-async-handler');

const getCustomers = asyncHandler(async() => {
    const response = await prisma.users.findMany(
        {
            select : {
                email: true,
                first_name: true,
                last_name: true,
                customer_image: true,
                role_id: true,
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

module.exports = {
    getCustomers,
}