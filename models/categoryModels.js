const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const asyncHandler = require("express-async-handler");

const getCategories = asyncHandler(async () => {
  const resposne = await prisma.categories.findMany();
  return resposne;
});

const patchCategories = asyncHandler(async (id, category_image) => {
  const response = await prisma.categories.update({
    where: {
      id,
    },
    data: {
      category_image,
    },
  });
});

module.exports = {
  getCategories,
  patchCategories,
};
