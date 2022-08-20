const models = require('../../models');

module.exports = {

    getAllActualites: function(req, res, next){
        models.actualites.findAll({
            include: [{
                model: models.categorie_actualites
            }]
        })
        .then(function(actualites){
            return res.status(200).json(actualites);
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    getActualiteById: function(req, res, next){

        const { id } = req.params;

        models.actualites.findOne({
            where: { Id_actualite: id },
            include: [{
                model: models.categorie_actualites,
                through: { attributes: [] }
            }]
        })
        .then(function(actualite){
            if(actualite){
                return res.status(200).json(actualite);
            }else {
                return res.status(404).json({'Reponse': 'Le post est introuvable ou n\'existe pas'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    postActualite: function(req, res, next){

        const title = req.body.title;
        const contenu = req.body.contenu;
        const categorie = req.body.categorie;
        const date = Date.now();
        // Assigne post to categorie

        models.actualites.create({
            Titre_actualite: title,
            Contenu_actualite: contenu,
            Date_actualite: date
        })
        .then(function(actualite){
            models.categorie_actualites.create({ Id_actualite: actualite.Id_actualite , Id_catogo_actu: categorie })
            .then(function(categorie){
                if(categorie){
                    return res.status(200).json(actualite);
                }else {
                    return res.status(404).json({});
                }
            })
            .catch(function(err){
                return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
            });
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    updateActualiteById: function(req, res, next){

        const { id } = req.params;
        
        const title = req.body.title;
        const contenu = req.body.contenu;

        models.actualites.update({
            Titre_actualite: title,
            Contenu_actualite: contenu
        }, {
            where: { Id_actualite: id }
        })
        .then(function(actualite){
            if(actualite){
                return res.status(200).json(actualite);
            }else {
                return res.status(404).json({'Reponse': 'Le post est introuvable ou n\'existe pas'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });

    },

    deleteActualiteById: function(req, res, next){

        const { id } = req.params;

        models.actualites.destroy({
            where: { Id_actualite: id }
        })
        .then(function(actualite){
            return res.status(200).json({'Reponse':'Le post a été supprimé'});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}