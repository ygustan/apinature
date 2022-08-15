const models = require('../../models');

module.exports = {

    getAllTypesQuiz: function(req, res, next){
        models.type_quiz.findAll({})
        .then(function(typesQuiz){
            return res.status(200).json(typesQuiz);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    getTypeQuizById: function(req, res, next){

        const { id } = req.params;

        models.type_quiz.findOne({
            where: {Id_type: id},
            include: [{
                model: models.quiz,
                through: { attributes: [] }
            }]
        })
        .then(function(typeQuiz){
            if(typeQuiz){
                return res.status(200).json(typeQuiz);
            }else {
                return res.status(404).json({'Reponse': 'Le type de quiz est introuvable'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    postTypeQuiz: function(req, res, next){

        const nom = req.body.nom;

        models.type_quiz.create({
            Nom_type: nom
        })
        .then(function(typeQuiz){
            return res.status(200).json(typeQuiz);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    updateTypeQuizById: function(req, res, next){

        const { id } = req.params;
        const nom = req.body.nom;

        models.type_quiz.update({
            Nom_type: nom
        },{
            where: { Id_type: id }
        })
        .then(function(typeQuiz){
            if(typeQuiz){
                return res.status(200).json({'Reponse': 'Le type de quiz a été mise à jour'});
            }else {
                return res.status(404).json({'Reponse': 'Le type de quiz est introuvable'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    deleteTypeQuizById: function(req, res, next){

        const { id } = req.params;

        models.type_quiz.destroy({
            where: { Id_type: id }
        })
        .then(function(typeQuiz){
            return res.status(200).json({'Reponse':'Le type de quiz a été supprimée'});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}