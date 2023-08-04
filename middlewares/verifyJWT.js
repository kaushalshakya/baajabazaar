const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader){
        return res.status(400).json(
            {
                status: 401,
                message: 'You are not authenticated'
            }
        )
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err) { 
            return res.status(400).json(
                {
                    status: 400,
                    message: 'Your token has been expired or tampered with'
                }
            )
        }
        console.log(decoded);
        req.id = decoded.id;
        req.role = decoded.role;
        req.email = decoded.email;
        next();
    })

}

module.exports = verifyJwt