const models = require('../../models');
const myxss = require('../../utils/xss.utils');

module.exports = {

    getAllQuiz: function(req, res, next){
        models.quiz.findAll({})
        .then(function(quiz){
            return res.status(200).json(quiz);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })
    },

    getQuizById: function(req, res, next){

        const { id } = req.params;

        models.quiz.findOne({
            where: { Id_quiz: id }
        })
        .then(function(quiz){
            if(quiz){
                return res.status(200).json(quiz);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })
    },

    postQuiz: function(req, res, next){

        const nom = myxss.process(req.body.nom);
        const date = Date.now();
        const typeId = req.body.typeId;

        models.quiz.create({
            Nom_quiz: nom,
            Date_quiz: date,
            Id_type: typeId,
        })
        .then(function(quiz){
            return res.status(200).json(quiz);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    updateQuizById: function(req, res, next){

        const { id } = req.params;

        const nom = myxss.process(req.body.nom);
        const date = Date.now();
        const typeId = req.body.typeId;

        models.quiz.update({
            Nom_quiz: nom,
            Date_quiz: date,
            Id_type: typeId,
        },{
            where: { Id_quiz: id }
        })
        .then(function(quiz){
           if(quiz){
                return res.status(200).json(quiz);
           }else {
                return res.status(404).json({});
           }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    deleteQuizById: function(req, res, next){

        const { id } = req.params;

        models.quiz.destroy({
            where: { Id_quiz: id }
        })
        .then(function(){
            return res.status(200).json({'Reponse': 'Le quiz est supprimé'});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    // Others functions 

    getQuizWithQuestionsByQuizId: function(req, res, next){

        const { id } = req.params;

        models.quiz.findOne({
            where: { Id_quiz: id },
            include: [{
                model: models.questions_quiz,
                through: { attributes: [] },
                include: [{
                    model: models.reponses_quiz,
                    attributes: ['Description_reponse'] ,
                    through: { attributes: [] }
                }]
            }]
        })
        .then(function(quiz){
            if(quiz){
                return res.status(200).json(quiz);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })
    },

    getResponsesByQuestionId: function(req, res, next){

        const { id } = req.params;

        models.questions_quiz.findOne({
            where: { Id_question: id },
            include: [{
                model: models.reponses_quiz,
                attributes: ['Description_reponse'],
                through: { attributes: [] }
            }]
        })
        .then(function(question){
            if(question){
                return res.status(200).json(question);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })
    },

    getResponseCorrectByQuestionId: function(req, res, next){

        const { id } = req.params;

        models.reponses_quiz.findOne({
            where: { Bonne_reponse: 1 },
            include: [{
                model: models.questions_quiz,
                where: { Id_question: id },
                attributes: [],
                through: { attributes: [] }
            }]
        })
        .then(function(question){
            if(question){
                return res.status(200).json(question);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })


    },

    getOldResponseCorrect: function(req, res, next){

        const { id } = req.params;

        models.questions_quiz.findOne({
            where: { Id_question: id },
            include: [{
                model: models.reponses_quiz,
                through: { attributes: [] }
            }]
        })
        .then(function(question){
            if(question){
                return res.status(200).json(question);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })


    }

}