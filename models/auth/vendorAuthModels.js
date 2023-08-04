const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const asyncHandler = require('express-async-handler');

const vendorLoginModel = asyncHandler(async(email, password) =>{
    const response = await prisma.vendors.findFirst(
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
    const response = await prisma.vendors.update(
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

const vendorLogoutModel = asyncHandler(async (email) => {
    const response = await prisma.vendors.update(
        {
            where:{
                email
            },
            data : {
                refresh_token: null
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

module.exports = {
    vendorLoginModel,
    setRefreshToken,
    vendorLogoutModel
}