const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();


router.post('/', loginRequired, CategoryController.createCategory);
router.get("/", loginRequired, CategoryController.getAllCategories);
router.get("/with-products", loginRequired, CategoryController.getAllCategoriesAndProducts);
router.get("/:id", loginRequired, CategoryController.getCategoryById);
router.put("/:id", loginRequired, CategoryController.updateCategory);
router.delete("/:id", loginRequired, CategoryController.deleteCategory);

module.exports = router;