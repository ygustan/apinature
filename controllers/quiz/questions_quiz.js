const models = require('../../models');
const myxss = require('../../utils/xss.utils');

module.exports = {

    getAllQuestions: function(req, res, next){
        models.questions_quiz.findAll({})
        .then(function(questions){
            return res.status(200).json(questions);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })
    },

    getQuestionById: function(req, res, next){

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
    },

    postQuestion: function(req, res, next){

        const question = myxss.process(req.body.question);
        const questionMultiple = req.body.questionMultiple;
        const quizId = req.body.quizId;

        models.questions_quiz.create({
            Question: question,
            Question_multiple: questionMultiple
        })
        .then(function(question){
            models.lien_question.create({ Id_quiz: quizId, Id_question: question.Id_question })
            .then(function(lienQuestion){
                return res.status(200).json(question);
            }).catch(function(err){
                return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
            });
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    updateQuestionById: function(req, res, next){

        const { id } = req.params;

        const question = myxss.process(req.body.question);
        const questionMultiple = req.body.questionMultiple;

        models.questions_quiz.update({
            Question: question,
            Question_multiple: questionMultiple
        },{
            where: { Id_question: id }
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
        });
    },

    deleteQuestionById: function(req, res, next){

        const { id } = req.params;

        models.questions_quiz.destroy({
            where: { Id_question: id }
        })
        .then(function(){
            return res.status(200).json({});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}