const models = require('../../models');
const myxss = require('../../utils/xss.utils');

module.exports = {

    getAllHabitatAnimaux: function(req, res, next){
        models.habitat_animaux.findAll({})
        .then(function(HabitatAnimaux){
            return res.status(200).json(HabitatAnimaux);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    getHabitatAnimauxById: function(req, res, next){

        const { id } = req.params;

        models.habitat_animaux.findOne({
            where: { Id_habitat: id }
        })
        .then(function(HabitatAnimaux){
            if(HabitatAnimaux){
                return res.status(200).json(HabitatAnimaux);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    postHabitatAnimaux: function(req, res, next){

        const nom = myxss.process(req.body.nom);
        const description = myxss.process(req.body.description);

        models.habitat_animaux.create({
            Nom_habitat: nom,
            Description_habitat: description
        })
        .then(function(HabitatAnimaux){
            return res.status(200).json(HabitatAnimaux);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    updateHabitatAnimauxById: function(req, res, next){

        const { id } = req.params;
        
        const nom = myxss.process(req.body.nom);
        const description = myxss.process(req.body.description);

        models.habitat_animaux.update({
            Nom_habitat: nom,
            Description_habitat: description
        },{
            where: { Id_habitat: id }
        })
        .then(function(HabitatAnimaux){
            if(HabitatAnimaux){
                return res.status(200).json(HabitatAnimaux);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    deleteHabitatAnimauxById: function(req, res, next){

        const { id } = req.params;

        models.habitat_animaux.destroy({
            where: { Id_habitat: id }
        })
        .then(function(HabitatAnimaux){
            if(HabitatAnimaux){
                return res.status(200).json(HabitatAnimaux);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}