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
                customer_image: true
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const postCustomer = asyncHandler(async(fields) => {
    const response = await prisma.users.create(
        {
            data :{
                    email: fields.email,
                    first_name: fields.first_name,
                    last_name: fields.last_name,
                    contact: parseInt(fields.contact),
                    password: fields.password,
                    customer_image: fields.image
            }   
        }
    )
    await prisma.$disconnect();
    return response;
    
})

module.exports = {
    getCustomers,
    postCustomer
}