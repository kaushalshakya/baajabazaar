const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const asyncHandler = require('express-async-handler');

const getUserOrders = asyncHandler(async(customer_id) => {
    const response = await prisma.orders.findMany(
        {
            where : {
                customer_id
            },
            include : {
                user: {
                    select : {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                        contact: true
                    }
                }
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const getRecentOrder = asyncHandler(async (customer_id) => {
    const response = await prisma.orders.findFirst(
        {
            where : {
                customer_id
            },
            orderBy: {
                id: 'desc'
            },
            include : {
                user: {
                    select : {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                        contact: true
                    }
                }
            }
        }
    )
    await prisma.$disconnect();
    return response; 
})

const postOrder = asyncHandler(async (fields) => {
    const response = await prisma.orders.create(
        {
            data : {
                customer_id: fields.id,
                shipping_address: fields.shipping_address,
                contact_no: fields.contact
            }
        }
    )
    await prisma.$disconnect()
    return response;
})

const postOrderDetails = asyncHandler(async(fields) => {
    const response = await prisma.order_details.create(
        {
            data : {
                order_id: fields.order_id,
                product_id: fields.product_id,
                quantity: fields.quantity,
                total_amount: fields.total_amount,
                customer_id: fields.customer_id
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const getUserCartItems = asyncHandler(async(id) => {
    const response = await prisma.cart_details.findMany(
        {
            where : {
                user_id: id
            },
            select : {
                quantity: true,
                total_amount: true,
                product_id: true
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const updateTotal = asyncHandler(async(id, total) => {
    const response = await prisma.orders.update(
        {
            where : {
                id
            },
            data : {
                total_amount: total
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const getOrderDetails = asyncHandler (async (id) => {
    const response = await prisma.order_details.findMany({
        where: {
            user_id: id
        },
        include: {
            product: {
                select: {
                    product_name: true,
                    product_price: true,
                    product_description: true,
                    product_category: true,
                    vendor: {
                        select: {
                            vendor_name: true
                        }
                    }
                }
            }
        }
    });
    await prisma.$disconnect();
    return response;
})

const getRecentOrderDetails = asyncHandler(async (order_id) => {
    const response = await prisma.order_details.findMany({
        where: {
            order_id
        },
        select: {
            order_id: false, 
            product: {
                select: {
                    product_name: true,
                    product_price: true,
                    product_description: true,
                    product_category: true,
                    vendor: {
                        select: {
                            vendor_name: true
                        }
                    }
                }
            }
        }
    });
    await prisma.$disconnect();
    return response;
});


const emptyCartModel = asyncHandler(async(user_id) => {
    const response = await prisma.cart_details.deleteMany(
        {
            where : {
                user_id
            }
        }
    )
    await prisma.$disconnect();
    return response;
})

const deleteOrder = asyncHandler(async (id) => {
    const response = await prisma.orders.delete(
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
    postOrder,
    postOrderDetails,
    getUserCartItems,
    updateTotal,
    getUserOrders,
    getOrderDetails,
    emptyCartModel,
    getRecentOrder,
    getRecentOrderDetails,
    deleteOrder
}