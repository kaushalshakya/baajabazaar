const { createOrder } = require('../controllers/orderControllers');

const router = require('express').Router();

router.get('/');
router.post('/', createOrder);

module.exports = router;