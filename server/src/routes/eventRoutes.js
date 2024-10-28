const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const EventController = require('../controllers/EventController');
const router = express.Router();

router.post("/", loginRequired, EventController.createEvent);
router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.put("/:id", loginRequired, EventController.updateEvent);
router.delete("/:id", loginRequired, EventController.deleteEvent);
module.exports = router;