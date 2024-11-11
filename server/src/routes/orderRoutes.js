const express = require('express');
const loginRequired = require('../middlewares/loginRequired');
const OrderController = require('../controllers/OrderController');
const router = express.Router();

router.post('/', OrderController.createOrder);
// router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
// router.put('/:id', OrderController.updateOrder);
// router.delete('/:id', OrderController.deleteOrder);

router.get('/user/:user_id', OrderController.getUserOrders)
module.exports = router;