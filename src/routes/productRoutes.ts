import express from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController';
import auth from '../middleware/auth';
import { upload, uploadToCloudinary } from '../middleware/cloudinaryUpload';

const router = express.Router();

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', getProducts);

// @route   POST api/products
// @desc    Add new product
// @access  Private
router.post('/', auth, upload.single('image'), uploadToCloudinary, addProduct);

// @route   PUT api/products/:id
// @desc    Update product
// @access  Private
router.put('/:id', auth, upload.single('image'), uploadToCloudinary, updateProduct);

// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Private
router.delete('/:id', auth, deleteProduct);

export default router;
