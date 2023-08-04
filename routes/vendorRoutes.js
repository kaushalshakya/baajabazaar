const {
    allVendors,
    registerVendor
} = require('../controllers/vendorControllers');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/vendors' });

router.get('/', allVendors);
router.post('/', upload.single('image'), registerVendor);

module.exports = router;