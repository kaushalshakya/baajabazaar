const {
    allVendors,
    updateVendors,
    deleteVendor
} = require('../controllers/vendorControllers');
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest:'uploads/vendors' });

router.get('/', allVendors);
router.put('/', upload.single('image'), updateVendors);
router.delete('/', deleteVendor);

module.exports = router;