const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const asyncHandler = require("express-async-handler");

const getCart = asyncHandler(async (user_id) => {
  const response = await prisma.cart_details.findMany({
    where: {
      user_id,
    },
    include: {
      product: true,
    },
  });
  await prisma.$disconnect();
  return response;
});

const getCartById = asyncHandler(async (id) => {
  const response = await prisma.cart_details.findFirst({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return response;
});

const postCart = asyncHandler(async (fields) => {
  const response = await prisma.cart_details.create({
    data: {
      user_id: fields.user_id,
      product_id: fields.product_id,
      total_amount: fields.total_amount,
    },
  });
  await prisma.$disconnect();
  return response;
});

const putCart = async ({ quantity, totalAmount, id }) => {
  try {
    const response = await prisma.cart_details.update({
      where: {
        id,
      },
      data: {
        quantity,
        total_amount: totalAmount,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

const deleteCartItem = asyncHandler(async (id) => {
  const respone = await prisma.cart_details.delete({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return respone;
});

module.exports = {
  getCart,
  getCartById,
  postCart,
  putCart,
  deleteCartItem,
};
