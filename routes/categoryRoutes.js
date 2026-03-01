const express = require('express');
const router = express.Router();
const { AddCategory, GetAllCategories } = require('../controllers/categoryController');

router.post('/', AddCategory);
router.get('/', GetAllCategories);

module.exports = router;