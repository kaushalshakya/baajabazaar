const {
    vendorLogin, 
    vendorLogout,
    registerVendor
} = require('../../controllers/auth/vendorAuthController');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/vendors' });

router.post('/login', vendorLogin);
router.post('/register', upload.single('image'), registerVendor);
router.post('/logout', vendorLogout);

module.exports = router