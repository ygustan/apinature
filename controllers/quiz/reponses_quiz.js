const models = require('../../models');
const myxss = require('../../utils/xss.utils');

module.exports = {

    getAllReponses: function(req, res, next){
        models.reponses_quiz.findAll({})
        .then(function(reponses){
            return res.status(200).json(reponses);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })
    },

    getReponseById: function(req, res, next){

        const { id } = req.params;

        models.reponses_quiz.findOne({
            where: { Id_reponse: id }
        })
        .then(function(reponse){
            if(reponse){
                return res.status(200).json(reponse);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })
    },

    postReponse: function(req, res, next){

        const description = myxss.process(req.body.description);
        const reponse = req.body.reponse;
        const questionId = req.body.questionId;

        models.reponses_quiz.create({
            Description_reponse: description,
            Bonne_reponse: reponse
        })
        .then(function(reponse){
            models.lien_reponse.create({ Id_question: questionId, Id_reponse: reponse.Id_reponse })
            .then(function(lienReponse){
                return res.status(200).json(reponse);
            }).catch(function(err){
                return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
            });
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    updateReponseById: function(req, res, next){

        const { id } = req.params;

        const description = myxss.process(req.body.description);
        const reponse = req.body.reponse;

        models.reponses_quiz.update({
            Description_reponse: description,
            Bonne_reponse: reponse
        },{
            where: { Id_reponse: id }
        })
        .then(function(reponse){
           if(reponse){
                return res.status(200).json(reponse);
           }else {
                return res.status(404).json({});
           }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    deleteReponseById: function(req, res, next){

        const { id } = req.params;

        models.reponses_quiz.destroy({
            where: { Id_reponse: id }
        })
        .then(function(){
            return res.status(200).json({});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}