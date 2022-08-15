const models = require('../../models');


module.exports = {

    getAllCategorieActualites: function(req, res, next){
        models.categorie_actualites.findAll({})
        .then(function(categories){
            return res.status(200).json(categories);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    getCategorieActualiteById: function(req, res, next){

        const { id } = req.params;

        models.categorie_actualites.findOne({
            where:{ Id_catego_actu: id }
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

    postCategorieActualite: function(req, res, next){

        const nom = req.body.nom;

        models.categorie_actualites.create({
            Nom_categorie: nom
        })
        .then(function(categorie){
            return res.status(200).json(categorie);
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    updateCategorieActualiteById: function(req, res, next){

        const { id } = req.params;

        const nom = req.body.nom;

        models.categorie_actualites.update({
            Nom_categorie: nom
        }, {
            where:{ Id_catego_actu: id }
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

    deleteCategorieActualiteById: function(req, res, next){

        const { id } = req.params;
 
        models.categorie_actualites.destroy({
            where:{ Id_catego_actu: id }
        })
        .then(function(){
            return res.status(200).json({'Reponse':''});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}