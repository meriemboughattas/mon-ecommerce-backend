const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    commande: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'order', 
        required: true 
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    montant: { type: Number, required: true },
    methode: { type: String, required: true }, 
    datePaiement: { type: Date, default: Date.now },
    statut: { 
        type: String, 
        enum:['succes', 'echec', 'en_attente'],
        default: 'en_attente'
    }
}, { timestamps: true });

module.exports = mongoose.model('payment', paymentSchema);