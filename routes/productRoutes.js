const express = require('express');

const formidable = require('express-formidable');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController } = require('../controllers/productController');

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)


module.exports = router