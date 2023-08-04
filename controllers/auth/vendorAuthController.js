const {
    vendorLoginModel,
    setRefreshToken,
    vendorLogoutModel,
    vendorRegisterModel
} = require('../../models/auth/vendorAuthModels')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

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
    const result = await vendorRegisterModel(data);
    return res.status(200).json(
        {
            status: 200,
            message: 'Vendor registered successfully!'
        }
    )
})

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
            id: result.id,
            email: result.email,
            vendor_name: result.vendor_name,
            role: result.role_id
        },
        process.env.ACCESS_TOKEN,
        // {expiresIn: '15s'}
    )

    const refreshToken = jwt.sign(
        {
            id: result.id,
            email: result.email,
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

const vendorLogout = asyncHandler(async(req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
        if(err) {
            return res.status(400).json(
                {
                    status: 400,
                    message: 'Token tampered or expired'
                }
            ) 
        }else{
            const email = decoded.email;
            await vendorLogoutModel(email);
            return res.status(200).json(
                {
                    status: 200,
                    message: 'Logged out successfully'
                }
            )
        }
    })
})

module.exports = {
    registerVendor,
    vendorLogin,
    vendorLogout
}