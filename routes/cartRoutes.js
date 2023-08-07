const {
    cartItems,
    addToCart
} = require('../controllers/cartControllers');
const router = require('express').Router();

router.get('/', cartItems);
router.post('/', addToCart);

module.exports = router;