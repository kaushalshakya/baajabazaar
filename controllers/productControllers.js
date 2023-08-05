const {
    getAllProducts,
    getVendorProducts,
    postProduct
} = require('../models/productModels');
const asyncHandler = require('express-async-handler');

const allProducts = asyncHandler(async(req, res) => {
    const id = req.id;
    const role = req.role;
    if(role === 1) {
        const result = await getAllProducts();
        return res.status(200).json(
            {
                status: 200,
                message: 'All products:',
                data: result
            }
        )
    }
    const result = await getVendorProducts(id);
    return res.status(200).json(
        {
            status: 200,
            message: 'Your products:',
            data: result
        }
    )
})

const createProduct = asyncHandler(async (req, res) => {
    const id = req.id;
    const image = req.file;

    if(id !== 2){
        return res.status(401).json(
            {
                status: 403,
                message: 'Your are not authorized to view this page'
            }
        )
    }
    const data = {
        product_name: req.body.product_name,
        product_price: parseInt(req.body.product_price),
        product_image: req.file.originalname,
        product_description: req.body.product_description,
        vendor_id: id
    }

    const result = await postProduct(data);
    return res.status(200).json(
        {
            status: 200,
            message: 'Product created successfully!'
        }
    )
})

module.exports = {
    allProducts,
    createProduct,
}