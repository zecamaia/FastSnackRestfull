const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const ProdutoController = require('../controllers/ProdutoController');
const router = express.Router();

router.post("/", loginRequired, ProdutoController.store);
router.get("/", loginRequired, ProdutoController.index);
router.get("/:id", loginRequired, ProdutoController.show);
router.put("/:id", loginRequired, ProdutoController.update);
router.delete("/:id", loginRequired, ProdutoController.delete);
module.exports = router