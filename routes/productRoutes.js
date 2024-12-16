const express = require('express');

const formidable = require('express-formidable');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController } = require('../controllers/productController');

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

router.get('/get-product', getProductController)

router.get('/get-product/:slug', getSingleProductController)

router.get("/product-photo/:pid", productPhotoController);

router.get('/product/:pid', deleteProductController)
module.exports = router