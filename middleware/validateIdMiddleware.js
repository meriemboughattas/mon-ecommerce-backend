const mongoose = require('mongoose');

const validateId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send({ msg: 'Ressource non trouvée (ID Invalide)' });
    }
    next();
};

module.exports = validateId;