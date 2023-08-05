const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const asyncHandler = require('express-async-handler');

const getAllProducts = asyncHandler(async () => {
    const respone = await prisma.products.findMany();
    await prisma.$disconnect();
    return respone;
})

const getVendorProducts = asyncHandler(async (id) => {
    const response = await prisma.products.findMany(
        {
            where: {
                id
            }
        }
    )
    await prisma.$disconnect();
    return response
})

const postProduct = asyncHandler(async (fields) => {
    const response = await prisma.products.create(
        {
            data : {
                product_name: fields.product_name,
                product_price: fields.product_price,
                product_image: fields.product_image,
                product_description: fields.product_description,
                vendor_id: fields.vendor_id
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

module.exports = {
    getAllProducts,
    getVendorProducts,
    postProduct
}