const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const EventoController = require('../controllers/EventoController');
const router = express.Router();

router.post("/", loginRequired, EventoController.store);
router.get("/", loginRequired, EventoController.index);
router.get("/:id", loginRequired, EventoController.show);
router.put("/:id", loginRequired, EventoController.update);
router.delete("/:id", loginRequired, EventoController.delete);
module.exports = router