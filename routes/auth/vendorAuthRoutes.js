const {
    vendorLogin
} = require('../../controllers/auth/vendorAuthController');
const router = require('express').Router();

router.post('/login', vendorLogin);

module.exports = router