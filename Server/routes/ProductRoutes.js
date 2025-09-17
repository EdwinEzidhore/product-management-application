import express from 'express';
import { addProduct, createCategory, createSubCategory, getCategories, getProducts, getSubCategories } from '../controllers/ProductController.js';

const router = express.Router();


router.post('/create-category', createCategory);
router.get('/get-categories', getCategories);
router.post('/create-subcategory', createSubCategory);
router.get('/get-subcategories', getSubCategories);
router.post('/add-product', addProduct);
router.get('/get-products', getProducts);
export default router;