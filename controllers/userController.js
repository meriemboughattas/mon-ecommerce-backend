const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
    try {
        const { nom, email, motdepasse, role, infosvendeur, telephone, adresse } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send({ msg: 'Cet email est déjà utilisé' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(motdepasse, salt);

        let userData = {
            nom,
            email,
            motdepasse: hashedPassword, 
            role,
            telephone,
            adresse
        };

        if (role === 'vendeur') {
            userData.infosvendeur = {
                ...infosvendeur, 
                statutvalidation: 'en_attente' 
            };
        }
       
        const newUser = new User(userData);
        await newUser.save();
        
        const userSansMdp = newUser.toObject();
        delete userSansMdp.motdepasse;
       
        res.status(201).send({ msg: 'Inscription réussie', user: userSansMdp });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Erreur inscription', error });
    }
};

const Login = async (req, res) => {
    try {
        const { email, motdepasse } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);
        if (!isMatch) {
            return res.status(400).send({ msg: 'Mot de passe incorrect' });
        }

        const payload = {
            id: user._id,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        const userSansMdp = user.toObject();
        delete userSansMdp.motdepasse;

        res.status(200).send({ msg: 'Connexion réussie', token, user: userSansMdp });

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
            { "infosvendeur.statutvalidation": statut }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ msg: 'Utilisateur non trouvé' });
        }

        res.status(200).send({ msg: `Vendeur passé en statut : ${statut}`, user: updatedUser });

    } catch (error) {
        res.status(500).send({ msg: 'Erreur validation', error });
    }
};

module.exports = { Register, Login, ValidateVendeur };