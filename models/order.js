const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    client: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Majuscule
        required: true 
    },
    lignesCommande:[
        {
            quantite: { type: Number, required: true },
            prixUnitaire: { type: Number, required: true }, 
            produit: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', // Majuscule
                required: true 
            }
        }
    ],
    adresseLivraison: { type: String, required: true },
    montantTotal: { type: Number, required: true },
    etat: { 
        type: String, 
        enum:['en_cours', 'payee', 'expediee', 'livree', 'annulee'],
        default: 'en_cours'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);