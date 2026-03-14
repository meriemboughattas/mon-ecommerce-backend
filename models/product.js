const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    image: { type: String },

    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Majuscule de retour
        required: true
    },
    vendeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',     // Majuscule de retour
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);