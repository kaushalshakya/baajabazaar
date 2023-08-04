const {
    vendorLogin, 
    vendorLogout
} = require('../../controllers/auth/vendorAuthController');
const router = require('express').Router();

router.post('/login', vendorLogin);
router.post('/logout', vendorLogout);

module.exports = router