const express = require('express');
const OrderTicketController = require('../controllers/OrderTicketController');
const  loginRequired  = require('../middlewares/loginRequired');
const router = express.Router();

router.post('/', OrderTicketController.createOrder);
router.get('/user/:user_id', OrderTicketController.getUserOrders);
router.put('/:order_id/status' , OrderTicketController.updateOrderStatus);

module.exports = router;