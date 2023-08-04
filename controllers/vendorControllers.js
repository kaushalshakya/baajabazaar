const {
    getVendor,
    checkPasswordMatch,
    putVendor,
    deleteVendorModel
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

const updateVendors = asyncHandler(async (req, res) => {
    const password = req.body.password;
    const id = req.id;
    console.log(id);
    const newPassword = req.body.new_password;
    
    const hashPassword = (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    const passwordCheck = await checkPasswordMatch(id);
    if(!bcrypt.compareSync(password, passwordCheck.password)){
        return res.status(400).json(
            {
                status: 400,
                message: 'Your password in incorrect. Please enter the correct password to update your details'
            }
        )
    }

    const data = {
        email: req.body.email ? req.body.email: passwordCheck.email,
        vendor_name: req.body.vendor_name ? req.body.vendor_name : passwordCheck.vendor_name,
        vendor_location: req.body.vendor_location? req.body.vendor_location: passwordCheck.vendor_location,
        contact: req.body.contact ? parseInt(req.body.contact): passwordCheck.contact,
        vendor_image: req.file ? req.file.filename: passwordCheck.vendor_image,
        password: newPassword ? hashPassword(newPassword) : passwordCheck.password
    }

    const result = await putVendor(id, data);

    return res.status(200).json(
        {
            status: 200,
            message: 'Data updated successfully!'
        }
    )
})

const deleteVendor = asyncHandler(async (req, res) => {
    const id = req.id;
    const password = req.body.password;
    const passwordCheck = await checkPasswordMatch(id);
    const dbPassword = passwordCheck.password;

    if(!bcrypt.compareSync(password, dbPassword)){
        return res.status(400).json(
            {
                status: 400,
                message: 'Your password is incorrect. Please enter the correct password to delete your account'
            }
        )
    }

    const result = await deleteVendorModel(id);
    return res.status(200).json(
        {
            status: 200,
            message: 'Vendor deleted successfully'
        }
    )
})

module.exports = {
    allVendors,
    updateVendors,
    deleteVendor
}