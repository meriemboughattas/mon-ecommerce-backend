const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
    try {
        const { nom, email, motdepasse, role, infosvendeur, telephone, adresse } = req.body;

        // 1. Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send({ msg: 'Cet email est déjà utilisé' });
        }

        // 2. Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(motdepasse, salt);

        // 3. Préparer les données de l'utilisateur
        let userData = {
            nom,
            email,
            motdepasse: hashedPassword, 
            role,
            telephone,
            adresse
        };

        // 4. Si c'est un vendeur, on ajoute ses infos spécifiques
        if (role === 'vendeur') {
            userData.infosvendeur = {
                ...infosvendeur, 
                statutvalidation: 'en_attente' 
            };
        }
       
        // 5. Créer et sauvegarder l'utilisateur
        const newUser = new User(userData);
        await newUser.save();
        
        // 6. Formater la réponse (ne jamais renvoyer le mot de passe)
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

        // 1. Chercher l'utilisateur par son email (Correction : j'ai retiré le 'e' qui traînait)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: 'Utilisateur non trouvé' });
        }

        // 2. Comparer les mots de passe (Correction : j'ai retiré le 'e' qui traînait)
        const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);
        if (!isMatch) {
            return res.status(400).send({ msg: 'Mot de passe incorrect' });
        }

        // 3. Créer le contenu du Token (Payload)
        const payload = {
            id: user._id,
            role: user.role
        };

        // 4. Générer le Token JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        // 5. Formater la réponse (Correction : j'ai retiré le 'e' qui traînait)
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
        const { statut } = req.body; // 'valide' ou 'refuse'

        // Mise à jour du statut du vendeur
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