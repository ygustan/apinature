const models = require('../../models');
const myxss = require('../../utils/xss.utils');

module.exports = {

    getAllProduits: function(req, res, next){
        models.produit.findAll({
            include: [{
                model: models.categorie_produit
            }]
        })
        .then(function(produit){
            return res.status(200).json(produit);
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    getProduitById: function(req, res, next){

        const { id } = req.params;

        models.produit.findOne({
            where: { Id_produit: id },
            include: [{
                model: models.categorie_produit,
                through: { attributes: [] }
            }]
        })
        .then(function(produit){
            if(produit){
                return res.status(200).json(produit);
            }else {
                return res.status(404).json({'Reponse': 'Le produit est introuvable ou n\'existe pas'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    postProduit: function(req, res, next){

        const nom = myxss.process(req.body.nom);
        const quantite = req.body.quantite;
        const description = myxss.process(req.body.description);
        const prix = req.body.prix;
        const image = myxss.process(req.body.image);
        const categorie = req.body.categorieId;

        models.produit.create({
            Nom_produit: nom,
            Quantite: quantite,
            Description_produit: description,
            Prix_unitaire: prix,
            Image_produit: image
        })
        .then(function(produit){
            models.lien_produit.create({ Id_produit: produit.Id_produit , Id_catego_produit: categorie })
            .then(function(categorie){
                if(categorie){
                    return res.status(200).json(produit);
                }else {
                    return res.status(404).json({});
                }
            })
            .catch(function(err){
                return res.status(500).json({'Error': `${err}`});
            });
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    updateProduitById: function(req, res, next){

        const { id } = req.params;
        
        const nom = myxss.process(req.body.nom);
        const quantite = req.body.quantite;
        const description = myxss.process(req.body.description);
        const prix = req.body.prix;
        const image = myxss.process(req.body.image);

        models.produit.update({
            Nom_produit: nom,
            Quantite: quantite,
            Description_produit: description,
            Prix_unitaire: prix,
            Image_produit: image
        }, {
            where: { Id_produit: id }
        })
        .then(function(produit){
            if(produit){
                return res.status(200).json(produit);
            }else {
                return res.status(404).json({'Reponse': 'Le produit est introuvable ou n\'existe pas'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });

    },

    deleteProduitById: function(req, res, next){

        const { id } = req.params;

        models.produit.destroy({
            where: { Id_produit: id }
        })
        .then(function(actualite){
            return res.status(200).json({'Reponse':'Le produit a été supprimé'});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}