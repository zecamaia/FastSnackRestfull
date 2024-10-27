const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const OrderController = require('../controllers/OrderController');
const router = express.Router();

router.post('/', loginRequired, OrderController.createOrder);
router.get('/', loginRequired, OrderController.getAllOrders);
router.get('/:id', loginRequired, OrderController.getOrderById);
router.put('/:id', loginRequired, OrderController.updateOrder);
router.delete('/:id', loginRequired, OrderController.deleteOrder);

module.exports = router;