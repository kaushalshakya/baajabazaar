const {
    getVendor,
} = require('../models/vendorModels');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const allVendors = asyncHandler(async (req, res) => {
    const result = await getVendor();
    return res.status(200).json({
        status: 200,
        messae: 'All vendors:',
        data: result
    })
})

module.exports = {
    allVendors,
}