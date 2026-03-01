const User = require('../models/User');
const bcrypt = require('bcryptjs'); 


const Register = async (req, res) => {
    try {
        const { nom, email, motDePasse, role, infosVendeur, telephone, adresse } = req.body;

        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send({ msg: 'Cet email est déjà utilisé' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(motDePasse, salt);

        
        const newUser = new User({
            nom, 
            email, 
            motDePasse: hashedPassword, 
            role,
            infosVendeur, 
            telephone,
            adresse
        });

        await newUser.save();
        res.status(200).send({ msg: 'Inscription réussie', user: newUser });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur inscription', error });
    }
};


const Login = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;
        
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'Utilisateur non trouvé' });
        }

        
        const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
        if (!isMatch) {
            return res.status(400).send({ msg: 'Mot de passe incorrect' });
        }

        
        res.status(200).send({ msg: 'Connexion réussie', user });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur connexion', error });
    }
};


const ValidateVendeur = async (req, res) => {
    try {
        const id = req.params.id; 
        const { statut } = req.body; 

        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { "infosVendeur.statutValidation": statut }, 
            { new: true }
        );

        res.status(200).send({ msg: `Vendeur passé en statut : ${statut}`, user: updatedUser });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur validation', error });
    }
};

module.exports = { Register, Login, ValidateVendor };