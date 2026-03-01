const express = require('express');
const router = express.Router();
const { CreatePayment } = require('../controllers/paymentController');

router.post('/', CreatePayment);

module.exports = router;