const {
    allVendors,
    registerVendor
} = require('../controllers/vendorControllers');
const router = require('express').Router();


router.get('/', allVendors);

module.exports = router;