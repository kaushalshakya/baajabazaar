const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const asyncHandler = require("express-async-handler");

const getVendor = asyncHandler(async () => {
  const response = await prisma.vendors.findMany();
  await prisma.$disconnect();
  return response;
});

const checkPasswordMatch = asyncHandler(async (id) => {
  const response = await prisma.vendors.findFirst({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return response;
});

const putVendor = asyncHandler(async (id, fields) => {
  const response = await prisma.vendors.update({
    where: {
      id,
    },
    data: {
      email: fields.email,
      vendor_name: fields.vendor_name,
      vendor_location: fields.vendor_location,
      contact: fields.contact,
      vendor_image: fields.vendor_image,
      password: fields.vendor_password,
    },
  });
  await prisma.$disconnect();
  return response;
});

const deleteVendorModel = asyncHandler(async (id) => {
  const response = await prisma.vendors.delete({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return response;
});

module.exports = {
  getVendor,
  putVendor,
  checkPasswordMatch,
  deleteVendorModel,
};
