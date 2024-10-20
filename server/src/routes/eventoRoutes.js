const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const EventoController = require('../controllers/EventoController');
const router = express.Router();

router.post("/", EventoController.store);
// router.get("/",loginRequired, EventoController.index);
// router.get("/:id", EventoController.show);
// router.put("/:id", EventoController.update)
// router.delete("/:id", EventoController.delete)
module.exports = router