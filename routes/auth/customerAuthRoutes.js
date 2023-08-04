const {
    customerLogin, 
    customerLogout
} = require('../../controllers/auth/customerAuthControllers');
const router = require('express').Router();

router.post('/login', customerLogin);
router.post('/logout', customerLogout);

module.exports = router;