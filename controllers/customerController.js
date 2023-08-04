const {
    getCustomers,
} = require('../models/customerModels');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const allCustomers = asyncHandler(async (req, res) =>{
    const response = await getCustomers();
    return res.status(200).json(
        {
            status: 200,
            message: 'All customers:',
            data: response
        }
    )
})

module.exports = {
    allCustomers,
}