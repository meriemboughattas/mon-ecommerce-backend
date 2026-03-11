 const Payment = require('../models/Payment');

const CreatePayment = async (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        await newPayment.save();
        res.status(200).send({ msg: 'Paiement enregistré', payment: newPayment });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur paiement', error });
    }
};

module.exports = { CreatePayment };