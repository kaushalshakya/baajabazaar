const { 
    allProducts, 
    createProduct 
} = require('../controllers/productControllers');

const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest : 'uploads/products'})

router.get('/', allProducts);
router.post('/', upload.single('image'), createProduct);
router.put('/');
router.delete('/');

module.exports = router;