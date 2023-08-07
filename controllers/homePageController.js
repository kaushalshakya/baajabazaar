const homePageModel  = require('../models/homePageModel');
const asyncHandler = require('express-async-handler');

const homePage = asyncHandler(async(req, res) => {
    const { page, limit, offset } = req.pagination;
    const products = await homePageModel(limit, offset);
    return res.status(200).json(
        {
            status: 200,
            message: 'Welcome to BajaBazaar',
            page: `Page ${page}`,
            products: products[0] ? products : 'End of Page'
        }
    )
})

module.exports = homePage;