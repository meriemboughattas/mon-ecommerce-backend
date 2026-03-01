const express = require('express');
const router = express.Router();
const { CreateOrder, GetMyOrders, UpdateOrderStatus } = require('../controllers/orderController');

router.post('/', CreateOrder);
router.get('/user/:userId', GetMyOrders); 
router.put('/:id', UpdateOrderStatus);

module.exports = router;