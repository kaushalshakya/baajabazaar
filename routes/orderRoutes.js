const { 
    createOrder, 
    viewOrderHistory, 
    recentOrder,
    cancelOrder
} = require('../controllers/orderControllers');

const router = require('express').Router();

router.get('/history', viewOrderHistory);
router.get('/', recentOrder);
router.post('/', createOrder);
router.delete('/:id', cancelOrder);

module.exports = router;