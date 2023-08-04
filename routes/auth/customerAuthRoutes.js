const {
    customerLogin, 
    customerLogout,
    registerCustomer
} = require('../../controllers/auth/customerAuthControllers');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/customers' });

router.post('/login', customerLogin);
router.post('/register', upload.single('image'), registerCustomer);
router.post('/logout', customerLogout);

module.exports = router;