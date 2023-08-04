const { 
    allCustomers
} = require('../controllers/customerController');
const router = require('express').Router();


router.get('/', allCustomers);


module.exports = router;