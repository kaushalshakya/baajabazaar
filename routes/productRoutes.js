const { 
    allProducts, 
    createProduct, 
    updateProduct,
    deleteProduct
} = require('../controllers/productControllers');

const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest : 'uploads/products'})

router.get('/', allProducts);
router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;