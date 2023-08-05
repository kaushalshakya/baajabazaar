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

const checkCustomers = asyncHandler(async(id) => {
    const response = await prisma.users.findFirst(
        {
            where : {
                id
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const putCustomers = asyncHandler(async(id, fields) => {
    const response = await prisma.users.update(
        {
            where : {
                id
            },
            data: {
                email: fields.email,
                first_name: fields.first_name,
                last_name: fields.last_name,
                password: fields.password,
                customer_image: fields.image,
                contact: fields.contact
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const deleteCustomerModel = asyncHandler(async (id) => {
    const response = await prisma.users.delete(
        {
            where : {
                id
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

module.exports = {
    getCustomers,
    checkCustomers,
    putCustomers,
    deleteCustomerModel
}