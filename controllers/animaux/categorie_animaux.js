const models = require('../../models');
const myxss = require('../../utils/xss.utils');

module.exports = {

    getAllCategorieAnimaux: function(req, res, next){

        models.categorie_animaux.findAll({})
        .then(function(categorieAnimaux){
            return res.status(200).json(categorieAnimaux);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });

    },

    getCategorieAnimauxById: function(req, res, next){
        const { id } = req.params;

        models.categorie_animaux.findOne({
            where: { Id_catego_animaux: id },
            include: [{
                model: models.animaux
            }]
        })
        .then(function(categorieAnimaux){
            if(categorieAnimaux){
                return res.status(200).json(categorieAnimaux);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    postCategorieAnimaux: function(req, res, next){

        const nom = myxss.process(req.body.nom);
        const description = myxss.process(req.body.description);

        models.categorie_animaux.create({
            Nom: nom,
            Description_catego: description
        })
        .then(function(categorieAnimaux){
            return res.status(200).json(categorieAnimaux);
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });

    },

    updateCategorieAnimauxById: function(req, res, next){
        const { id } = req.params;

        const nom = myxss.process(req.body.nom);
        const description = myxss.process(req.body.description);

        models.categorie_animaux.update({
            Nom: nom,
            Description_catego: description
        }, {
            where: { Id_catego_animaux: id }
        })        
        .then(function(categorieAnimaux){
            if(categorieAnimaux){
                return res.status(200).json(categorieAnimaux);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    deleteCategorieAnimauxById: function(req, res, next){
        const { id } = req.params;

        models.categorie_animaux.destroy({
            where: { Id_catego_animaux: id }
        })
        .then(function(categorieAnimaux){
            if(categorieAnimaux){
                return res.status(200).json(categorieAnimaux);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}