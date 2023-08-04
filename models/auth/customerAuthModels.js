const { PrismaClient } = require('@prisma/client');
const { response } = require('express');
const prisma = new PrismaClient;
const asyncHandler = require('express-async-handler');

const registerModel = asyncHandler(async(fields) => {
    const response = await prisma.users.create(
        {
            data :{
                    email: fields.email,
                    first_name: fields.first_name,
                    last_name: fields.last_name,
                    contact: fields.contact,
                    password: fields.password,
                    customer_image: fields.image,
                    role_id: fields.role_id
            }   
        }
    )
    await prisma.$disconnect();
    return response;
    
})

const loginModel = asyncHandler(async(email, password) => {
    const response = await prisma.users.findFirst(
        {
            where: {
                email
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const setRefreshToken = asyncHandler(async(email, refreshToken) => {
    const response = await prisma.users.update(
        {
            where : {
                email
            },
            data : {
                refresh_token: refreshToken
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const logoutModel = asyncHandler(async (email) => {
    const response = await prisma.users.update(
        {
            where: {
                email
            },
            data: {
                refresh_token: null
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

module.exports = {
    loginModel,
    setRefreshToken,
    logoutModel,
    registerModel
}