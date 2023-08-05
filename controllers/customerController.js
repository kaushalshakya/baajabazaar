const {
    getCustomers,
    checkCustomers,
    putCustomers,
    deleteCustomerModel
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

const updateCustomers = asyncHandler(async(req, res) => {
    const id = req.id;
    const password = req.body.password;
    console.log(req.body);
    const image = req.file;
    const newPassword = req.body.newPassword;

    const checkUser = await checkCustomers(id);

    if(!password){
        return res.status(400).json(
            {
                status: 400,
                message: 'Enter your password to update your details'
            }
        )
    }

    if(!bcrypt.compareSync(password, checkUser.password)){
        return res.status(400).json(
            {
                status: 400,
                message: 'Your password is incorrect. Please enter the correct password to update your details'
            }
        )
    }

    const hashPassword = (password) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    const data = {
        email: req.body.email ? req.body.email : checkUser.email,
        first_name: req.body.first_name ? req.body.first_name : checkUser.first_name,
        last_name: req.body.last_name ? req.body.last_name : checkUser.last_name,
        contact: req.body.contact ? req.body.contact : checkUser.contact,
        image: image ? image : checkUser.customer_image,
        password: newPassword ? hashPassword(newPassword) : checkUser.password
    }
    
    const response = await putCustomers(id, data);
    return res.status(200).json(
        {
            status: 200,
            message: 'Your details have been updated successfully!'
        }
    )
})

const deleteCustomers = asyncHandler(async (req, res) => {
    const password = req.body.password;
    const id = req.id;

    if(!password){
        return res.status(400).json(
            {
                status: 400,
                message: 'Enter password to delete your account'
            }
        )
    }

    const userCheck = await checkCustomers(id);

    if(!bcrypt.compareSync(password, userCheck.password)){
        return res.status(400).json(
            {
                status: 400,
                message: 'Your password is incorrect. Enter the correct password to delete your account'
            }
        )
    }

    const result = await deleteCustomerModel(id);
    return res.status(200).json(
        {
            status: 200,
            message: 'Your account has been deleted successfully'
        }
    )
})

module.exports = {
    allCustomers,
    updateCustomers,
    deleteCustomers
}