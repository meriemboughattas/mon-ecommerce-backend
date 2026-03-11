const mongoose = require('mongoose');
const User =require('./User');
const Order =require('./Order');


const paymentSchema = new mongoose.Schema({
   
    commande: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order', 
        required: true 
    },


    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    montant: { type: Number, required: true },
    methode: { type: String, required: true }, 
    datePaiement: { type: Date, default: Date.now },
    
    statut: { 
        type: String, 
        enum: ['succes', 'echec', 'en_attente'],
        default: 'en_attente'
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);