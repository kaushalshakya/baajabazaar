const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const asyncHandler = require('express-async-handler');

const getVendor = asyncHandler(async() => {
    const response = await prisma.vendors.findMany(
        {
            select : {
                vendor_name: true,
                vendor_location: true,
                vendor_image: true,
                email: true,
                role_id: true
            }
        }
    );
    await prisma.$disconnect();
    return response;
})

const checkPasswordMatch = asyncHandler(async (id) => {
    const response = await prisma.vendors.findFirst(
        {
            where: {
                id
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const putVendor = asyncHandler(async (id, fields) => {
    const response = await prisma.vendors.update(
        {
            where: {
                id
            },
            data : {
                email: fields.email,
                vendor_name: fields.vendor_name,
                vendor_location: fields.vendor_location,
                contact: fields.contact,
                vendor_image: fields.vendor_image,
                password: fields.vendor_password
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const deleteVendorModel = asyncHandler(async (id) => {
    const response = await prisma.vendors.delete(
        {
            where: {
                id
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

module.exports = {
    getVendor,
    putVendor,
    checkPasswordMatch,
    deleteVendorModel
}