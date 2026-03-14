const Order = require('../models/order');

const CreateOrder = async (req, res) => {
    try {
        
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(200).send({ msg: 'Commande passée avec succès', order: newOrder });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur commande', error });
    }
};


const GetMyOrders = async (req, res) => {
    try {
        
        const userId = req.params.userId;
        const orders = await Order.find({ client: userId }).populate('lignesCommande.produit');
        res.status(200).send({ msg: 'Vos commandes', orders });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur récupération', error });
    }
};


const UpdateOrderStatus = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { etat: req.body.etat },
            { new: true }
        );
        res.status(200).send({ msg: 'Statut commande mis à jour', order: updatedOrder });
    } catch (error) {
        res.status(500).send({ msg: 'Erreur mise à jour', error });
    }
};

module.exports = { CreateOrder, GetMyOrders, UpdateOrderStatus };