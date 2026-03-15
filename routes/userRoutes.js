const express = require('express');
const router = express.Router();
const { Register, Login, ValidateVendeur, GetVendeurs } = require('../controllers/userController');

router.post('/register', Register);
router.post('/login', Login);

const { protect, adminOnly } = require('../middleware/authMiddleware');

// ✅ NOUVEAU : Récupérer tous les vendeurs (admin seulement)
router.get('/vendeurs', protect, adminOnly, GetVendeurs);

// Route existante : valider un vendeur
router.put('/valider-vendeur/:id', protect, adminOnly, ValidateVendeur);

module.exports = router;
