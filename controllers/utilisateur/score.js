const models = require('../../models');

module.exports = {

    getAllScores: function(req, res, next){
        models.score.findAll({})
        .then(function(scores){
            return res.status(200).json(scores);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })
    },

    getScoreById: function(req, res, next){

        const { id } = req.params;

        models.score.findOne({
            where: { Id_score: id }
        })
        .then(function(score){
            if(score){
                return res.status(200).json(score);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })
    },


    postScore: function(req, res, next){

        const etat = req.body.etat;
        const historique = req.body.historique;
        const date = req.body.date;
        const idQuiz = req.body.idQuiz;
        const user = req.body.utilisateurId;

        models.score.create({
            Etat_score: etat,
            Json_historique: historique,
            Date_score: date,
            Id_quiz: idQuiz
        })
        .then(function(score){
            models.lien_score.create({ Id_utilisateur: user , Id_score: score.Id_score })
            .then(function(lien){
                if(lien) {
                    return res.status(200).json(score);
                }else {
                    return res.status(500).json({});
                }
            }).catch(function(err){
                return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
            });
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    updateScoreById: function(req, res, next){

        const { id } = req.params;

        const etat = req.body.etat;
        const historique = req.body.historique;
        const date = req.body.date;
        const idQuiz = req.body.idQuiz;

        models.score.update({
            Etat_score: etat,
            Json_historique: historique,
            Date_score: date,
            Id_quiz: idQuiz
        },{
            where: { Id_score: id }
        })
        .then(function(score){
           if(score){
                return res.status(200).json(score);
           }else {
                return res.status(404).json({});
           }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    deleteScoreById: function(req, res, next){

        const { id } = req.params;

        models.score.destroy({
            where: { Id_score: id }
        })
        .then(function(){
            return res.status(200).json({'Reponse': 'Le score est supprimé'});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}