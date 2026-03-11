const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            
            token = req.headers.authorization.split(' ')[1];

            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

           
            req.user = await User.findById(decoded.id).select('-motdepasse');

            next(); 
        } catch (error) {
            console.log(error);
            res.status(401).send({ msg: 'Non autorisé, token invalide' });
        }
    }

    if (!token) {
        res.status(401).send({ msg: 'Non autorisé, pas de token fourni' });
    }
};


const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send({ msg: 'Accès refusé. Réservé aux administrateurs.' });
    }
};

module.exports = { protect, adminOnly };