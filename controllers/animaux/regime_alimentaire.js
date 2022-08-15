const models = require('../../models');

module.exports = {

    getAllRegimeAlimentaire: function(req, res, next){
        console.log('Weird');
        models.regime_alimentaire.findAll({
            attributes: ['Id_regime','Nom_regime','Description_regime']
        })
        .then(function(regimeAlimentaire){
            if(!regimeAlimentaire) return res.sendStatus(404);
            return res.status(200).json(regimeAlimentaire);
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    getRegimeAlimentaireById: function(req, res, next){

        const { id } = req.params;

        models.regime_alimentaire.findOne({
            where: { Id_regime: id }
        })        
        .then(function(regimeAlimentaire){
            if(regimeAlimentaire){
                return res.status(200).json(regimeAlimentaire);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    postRegimeAlimentaire: function(req, res, next){

        const nom = req.body.nom;
        const description = req.body.description;

        models.regime_alimentaire.create({
            Nom_regime: nom,
            Description_regime: description
        })        
        .then(function(regimeAlimentaire){
            return res.status(200).json(regimeAlimentaire);
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    updateRegimeAlimentaireById: function(req, res, next){

        const { id } = req.params;

        const nom = req.body.nom;
        const description = req.body.description;

        models.regime_alimentaire.update({
            Nom_regime: nom,
            Description_regime: description
        }, {
            where: { Id_regime: id }
        })        
        .then(function(regimeAlimentaire){
            if(regimeAlimentaire){
                return res.status(200).json(regimeAlimentaire);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    deleteRegimeAlimentaireById: function(req, res, next){

        const { id } = req.params;

        models.regime_alimentaire.destroy({
            where: { Id_regime: id }
        })        
        .then(function(regimeAlimentaire){
            return res.status(200).json({'Reponse':'Le regime alimentaire a été supprimé'});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}