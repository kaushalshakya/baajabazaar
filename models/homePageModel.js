const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const asyncHandler = require("express-async-handler");

const homePageModel = asyncHandler(async () => {
  const response = await prisma.products.findMany({
    include: {
      vendor: true,
      category: true,
    },
  });
  await prisma.$disconnect();
  return response;
});

module.exports = homePageModel;
