const express = require('express');
const router = express.Router();


const { 
    AddProduct, 
    GetAllProducts, 
    GetOneProduct, 
    UpdateProduct, 
    DeleteProduct 
} = require('../controllers/productController');


const upload = require('../utils/multer'); 
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, upload.single('image'), AddProduct);


router.get('/', GetAllProducts);
router.get('/:id', GetOneProduct);

router.put('/:id', protect, upload.single('image'), UpdateProduct);


router.delete('/:id', protect, adminOnly, DeleteProduct);

module.exports = router;