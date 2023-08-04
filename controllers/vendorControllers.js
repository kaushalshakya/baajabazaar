const {
    getVendor,
    postVendor
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

const registerVendor = asyncHandler(async(req, res) =>{
    const password = req.body.password;
    const image = req.file;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const data = {
        vendor_name: req.body.vendor_name,
        vendor_location: req.body.vendor_location,
        contact: parseInt(req.body.contact),
        email: req.body.email,
        password: hash,
        image: image? image.filename : null,
        role_id: 2 
    }
    console.log(data.contact);
    const result = await postVendor(data);
    return res.status(200).json(
        {
            status: 200,
            message: 'Vendor registered successfully!'
        }
    )
})

module.exports = {
    allVendors,
    registerVendor
}