const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const asyncHandler = require('express-async-handler');

const vendorRegisterModel = asyncHandler(async (fields) =>{
    const response = await prisma.vendors.create(
       { 
            data : {
                vendor_name: fields.vendor_name,
                vendor_location: fields.vendor_location,
                contact: fields.contact,
                email: fields.email,
                password: fields.password,
                vendor_image: fields.image,
                role_id: fields.role_id
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

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
    vendorRegisterModel,
    vendorLoginModel,
    setRefreshToken,
    vendorLogoutModel
}