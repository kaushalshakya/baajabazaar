const { 
    allCustomers, 
    updateCustomers,
    deleteCustomers
} = require('../controllers/customerController');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest:'uploads/customers' });


router.get('/', allCustomers);
router.put('/', upload.single('image'), updateCustomers);
router.delete('/', deleteCustomers);


module.exports = router;