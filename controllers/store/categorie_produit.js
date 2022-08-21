const models = require('../../models');
const myxss = require('../../utils/xss.utils');

module.exports = {

    getAllCategorieProduit: function(req, res, next){
        models.categorie_produit.findAll({})
        .then(function(categories){
            return res.status(200).json(categories);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    getCategorieProduitById: function(req, res, next){

        const { id } = req.params;

        models.categorie_produit.findOne({
            where:{ Id_catego_produit: id }
        })
        .then(function(categorie){
            if(categorie){
                return res.status(200).json(categorie);
            }else {
                return res.status(404).json({'Reponse': 'La categorie est introuvable ou n\'existe pas'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    postCategorieProduit: function(req, res, next){

        const nom = myxss.process(req.body.nom);

        models.categorie_produit.create({
            Nom_categorie: nom
        })
        .then(function(categorie){
            return res.status(200).json(categorie);
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    updateCategorieProduitById: function(req, res, next){

        const { id } = req.params;

        const nom = myxss.process(req.body.nom);

        models.categorie_produit.update({
            Nom_categorie: nom
        }, {
            where:{ Id_catego_produit: id }
        })
        .then(function(categorie){
            if(categorie){
                return res.status(200).json(categorie);
            }else {
                return res.status(404).json({'Reponse': 'La categorie est introuvable ou n\'existe pas'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    deleteCategorieProduitById: function(req, res, next){

        const { id } = req.params;
 
        models.categorie_produit.destroy({
            where:{ Id_catego_produit: id }
        })
        .then(function(){
            return res.status(200).json({'Reponse':'La categorie a été supprimé'});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}