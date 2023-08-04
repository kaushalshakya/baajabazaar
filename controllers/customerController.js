const {
    getCustomers,
    postCustomer
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

const registerCustomer = asyncHandler(async(req, res) =>{
    const image = req.file;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;

    if(password !== confirmPassword){
        return res.status(400).json(
            {
                status: 400,
                message: 'Password and confirm password fields do not match'
            }
        )
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const data = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        contact: parseInt(req.body.contact),
        password: hash,
        image: image ? image.filename : null,
        role_id: 1
    }

    const result = await postCustomer(data);

    return res.status(200).json(
        {
            status: 200,
            message: 'Customer registered successfully'
        }
    )

})

module.exports = {
    allCustomers,
    registerCustomer
}