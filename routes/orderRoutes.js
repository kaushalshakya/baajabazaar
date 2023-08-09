const { 
    createOrder, 
    viewOrderHistory 
} = require('../controllers/orderControllers');

const router = require('express').Router();

router.get('/history', viewOrderHistory);
router.post('/', createOrder);

module.exports = router;