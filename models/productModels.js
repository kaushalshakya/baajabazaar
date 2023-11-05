const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const asyncHandler = require("express-async-handler");

const getAllProducts = asyncHandler(async () => {
  const respone = await prisma.products.findMany({
    include: {
      vendor: true,
      category: true,
    },
  });
  await prisma.$disconnect();
  return respone;
});

const getVendorProducts = asyncHandler(async (id) => {
  const response = await prisma.products.findMany({
    where: {
      vendor_id: id,
    },
    include: {
      category: true,
    },
  });
  await prisma.$disconnect();
  return response;
});

const getProductById = asyncHandler(async (id) => {
  const response = await prisma.products.findFirst({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return response;
});

const postProduct = asyncHandler(async (fields) => {
  const response = await prisma.products.create({
    data: {
      product_name: fields.product_name,
      product_price: fields.product_price,
      product_image: fields.product_image,
      product_description: fields.product_description,
      vendor_id: fields.vendor_id,
      product_category: parseInt(fields.product_category),
    },
  });
  await prisma.$disconnect();
  return response;
});

const putProduct = asyncHandler(async (id, vendor_id, fields) => {
  const response = await prisma.products.update({
    where: {
      id,
      vendor_id,
    },
    data: {
      product_name: fields.product_name,
      product_price: fields.product_price,
      product_image: fields.product_image,
      product_description: fields.product_description,
    },
  });
  await prisma.$disconnect();
  return response;
});

const deleteProductModel = asyncHandler(async (id) => {
  const respone = await prisma.products.delete({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return respone;
});

module.exports = {
  getAllProducts,
  getVendorProducts,
  postProduct,
  putProduct,
  getProductById,
  deleteProductModel,
};
