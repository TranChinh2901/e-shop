const express = require('express');

const formidable = require('express-formidable');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController } = require('../controllers/productController');

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

router.get('/get-product', getProductController)

router.get('/get-product/:slug', getSingleProductController)

router.get("/product-photo/:pid", productPhotoController);

router.get('/product/:pid', deleteProductController)

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);
//search product
router.get('/search/:keyword', searchProductController)

router.get('/related-product/:pid/:cid', relatedProductController)
router.get('/product-category/:slug', productCategoryController)
module.exports = router