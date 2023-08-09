const { 
    createOrder, 
    viewOrderHistory, 
    recentOrder
} = require('../controllers/orderControllers');

const router = require('express').Router();

router.get('/history', viewOrderHistory);
router.get('/', recentOrder);
router.post('/', createOrder);

module.exports = router;