const {
    registerCustomer, 
    allCustomers
} = require('../controllers/customerController');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/customers' });

router.get('/', allCustomers);
router.post('/', upload.single('image'), registerCustomer);

module.exports = router;