const Category = require('../models/category');

const AddCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).send({ msg: 'Catégorie créée', category: newCategory });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur création catégorie', error });
    }
};


const GetAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send({ msg: 'Liste catégories', categories });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur récupération', error });
    }
};

module.exports = { AddCategory, GetAllCategories };