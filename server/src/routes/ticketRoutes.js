const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const TicketController = require('../controllers/TicketController');
const router = express.Router();

router.post('/', loginRequired, TicketController.createTicket);
router.get('/', loginRequired, TicketController.getAllTickets);
router.get('/:id', loginRequired, TicketController.getTicketById);
router.put('/:id', loginRequired, TicketController.updateTicket);
router.delete('/:id', loginRequired, TicketController.deleteTicket);


module.exports = router;