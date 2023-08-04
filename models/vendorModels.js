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

const postVendor = asyncHandler(async (fields) =>{
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

module.exports = {
    getVendor,
    postVendor
}