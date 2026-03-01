const express = require('express');
const router = express.Router();
const { Register, Login, ValidateVendeur } = require('../controllers/userController');


router.post('/register', Register);
router.post('/login', Login);

router.put('/valider-vendeur/:id', ValidateVendeur);

module.exports = router;