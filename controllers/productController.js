const Product = require('../models/product');

const AddProduct = async (req, res) => {
    try {
        
        console.log("Données du formulaire (req.body) :", req.body);
        console.log("Fichier image (req.file) :", req.file);

        let imagePath = "";

        
        if (req.file) {
            
            imagePath = req.file.path;
        } else {
            return res.status(400).send({ msg: "Veuillez sélectionner une image !" });
        }

        const newProduct = new Product({
            ...req.body, 
            image: imagePath, 
            
            vendeur: req.user ? req.user._id : req.body.vendeur
        });

        await newProduct.save();

        res.status(201).send({ msg: 'Produit ajouté avec succès', product: newProduct });

    } catch (error) {
        console.error("ERREUR ADD_PRODUCT :", error);
        res.status(500).send({ msg: 'Erreur lors de l\'ajout', error });
    }
};

const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('categorie', 'nom') 
            .populate('vendeur', 'nom email nomBoutique');

        res.status(200).send({ msg: 'Liste des produits', products });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur récupération produits', error });
    }
};

const GetOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('categorie', 'nom')
            .populate('vendeur', 'nom email');

        if (!product) {
            return res.status(404).send({ msg: 'Produit non trouvé' });
        }
        res.status(200).send({ msg: 'Produit trouvé', product });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur récupération produit', error });
    }
};

const UpdateProduct = async (req, res) => {
    try {
        let dataToUpdate = { ...req.body };

       
        if (req.file) {
            dataToUpdate.image = req.file.path; 
        }

        const product = await Product.findByIdAndUpdate(req.params.id, dataToUpdate, { new: true });
        
        if (!product) {
            return res.status(404).send({ msg: 'Produit non trouvé' });
        }

        res.status(200).send({ msg: 'Produit modifié', product });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur modification', error });
    }
};

const DeleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ msg: 'Produit non trouvé' });
        }
        res.status(200).send({ msg: 'Produit supprimé' });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur suppression', error });
    }
};

module.exports = { 
    AddProduct, 
    GetAllProducts, 
    GetOneProduct, 
    UpdateProduct, 
    DeleteProduct 
};