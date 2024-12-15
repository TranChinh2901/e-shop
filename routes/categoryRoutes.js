const express = require('express'); // Import express
const {createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController} = require("../controllers/categoryController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router(); // Tạo instance của express.Router()

//create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);
//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);
//get all
router.get('/get-category', categoryController)

router.get('/single-category/:slug', singleCategoryController)

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);
module.exports = router; // Export router
