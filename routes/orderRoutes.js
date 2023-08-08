const { 
    createOrder, 
    viewOrder 
} = require('../controllers/orderControllers');

const router = require('express').Router();

router.get('/', viewOrder);
router.post('/', createOrder);

module.exports = router;