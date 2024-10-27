const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.post("/", loginRequired, ProductController.createProduct);
router.get("/", loginRequired, ProductController.getAllProducts);
router.get("/:id", loginRequired, ProductController.getProductById);
router.put("/:id", loginRequired, ProductController.updateProduct);
router.delete("/:id", loginRequired, ProductController.deleteProduct);
module.exports = router