
const Product = require('../models/Product');


const AddProduct = async (req, res) => {
    try {
        
        console.log("Données reçues :", req.body);

      
        const newProduct = new Product(req.body);

    
        await newProduct.save();

        
        res.status(200).send({ msg: 'Produit ajouté avec succès', product: newProduct });

    } catch (error) {
        
        res.status(500).send({ msg: 'Erreur lors de l\'ajout', error });
    }
};


module.exports = { AddProduct };