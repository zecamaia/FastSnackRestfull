const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const CategoriaController = require('../controllers/CategoriaController');
const router = express.Router();


router.post('/', loginRequired, CategoriaController.store);
router.get("/", loginRequired, CategoriaController.index);
router.get("/:id", loginRequired, CategoriaController.show);
router.put("/:id", loginRequired, CategoriaController.update);
router.delete("/:id", loginRequired, CategoriaController.delete);

module.exports = router;