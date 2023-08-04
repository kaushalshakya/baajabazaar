const {
    vendorLoginModel,
    setRefreshToken
} = require('../../models/auth/vendorAuthModels')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const vendorLogin = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    console.log(password);
    if(!email || !password){
        return res.status(400).json(
            {
                status: 400,
                message: 'Email and password is necessary for login'
            }
        )
    }
    const result = await vendorLoginModel(email, password);
    if(!result){
        return res.status(400).json(
            {
                status: 400,
                message: 'User does not exist'
            }
        )
    }
    const dbPassword = result.password;
    console.log(result);
    if(!bcrypt.compareSync(password, dbPassword)){
        return res.status(400).json(
            {
                status: 400,
                message: 'Invalid credentials'
            }
        )
    }

    const accessToken = jwt.sign(
        {
            email,
            vendor_name: result.vendor_name,
            role: result.role_id
        },
        process.env.ACCESS_TOKEN,
        // {expiresIn: '15s'}
    )

    const refreshToken = jwt.sign(
        {
            email,
            vendor_name: result.vendor_name,
            role: result.role_id
        },
        process.env.REFRESH_TOKEN,
        // {expiresIn: '15m'}
    )

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    setRefreshToken(email, refreshToken);

    return res.status(200).json(
        {
            status: 200,
            message: 'Logged in successfully!',
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    )
})

module.exports = {
    vendorLogin
}