
const models = require('../../models');
const bcrypt = require('bcrypt');

module.exports = {

    getAllUsers: function(req, res, next){
        models.utilisateurs.findAll({
            attributes: ['Id_utilisateur', 'Nom', 'Prenom', 'Email', 'Date_naissance', 'Date_enregistrement', 'Image_utilisateur'],
            include: [{
                model: models.role,
                through: { attributes: [] }
            }]
        })
        .then(function(users){
            if(users){
                return res.status(200).json(users);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        })
    },

    getUserById: function(req, res, next){

        const { id } = req.params;

        models.utilisateurs.findOne({
            attributes: ['Id_utilisateur', 'Nom', 'Prenom', 'Email', 'Date_naissance', 'Date_enregistrement', 'Image_utilisateur'],
            where: { Id_utilisateur: id },
            include: [{
                model: models.role,
                through: { attributes: [] }
            }]
        })
        .then(function(user){
            if(user){
                return res.status(200).json(user);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': err + 'Impossible d\'éffectuer la requête demandée'});
        })
    },

    postUser: function(req, res, next){

        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const email = req.body.email;
        const password = req.body.password;
        const dateNaissance = req.body.dateNaissance;
        const imageUtilisateur = req.body.imageUtilisateur;
        const roleId = 1;

        models.utilisateurs.findOne({
            attributes: ['Email'],
            where: { Email: email }
        }).then(function(user){
            if(!user){
                bcrypt.hash(password, 5, function(err, passwordCrypted){
                    models.utilisateurs.create({
                        Nom: nom,
                        Prenom: prenom,
                        Email: email,
                        Password: passwordCrypted,
                        Date_naissance: dateNaissance,
                        Date_enregistrement: '01/01/1990',
                        Image_utilisateur: imageUtilisateur
                    })
                    .then(function(user){
                        if(user){
                            models.lien_role.create({ Id_utilisateur: user.Id_utilisateur, Id_role: roleId })
                            .then(function(lienRole){
                                return res.status(200).json({'Reponse': user.Id_utilisateur});
                            }).catch(function(err){
                                return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
                            });
                        }else {
                            return res.status(500).json({'Error': 'Utilisateur crée sans assignation de role'});
                        }
                    })
                    .catch(function(err){
                        return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
                    });
                });
            }else {
                return res.status(403).json({'Error': 'L\'utilisateur existe déjà'});
            }
        }).catch(function(err){
            return res.status(500).json({ 'Error': 'Impossible d\'éffectuer la requête demandée'});
        });

    },

    updateUserById: function(req, res, next){

        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const dateNaissance = req.body.dateNaissance;
        const imageUtilisateur = req.body.imageUtilisateur;

        models.utilisateurs.update({
            Nom: nom,
            Prenom: prenom,
            Date_naissance: dateNaissance,
            Image_utilisateur: imageUtilisateur
        },{
            where: {Id_utilisateur: id}
        })
        .then(function(){
            return res.status(200).json({'Reponse': 'Mise à jour réussi'});
        })
        .catch(function(err){
            return res.status(500).json({ 'Error': 'Impossible d\'éffectuer la requête demandée'});
        });

    },

    deleteUserById: function(req, res, next){

        const { id } = req.params;

        models.utilisateurs.destroy({
            where: { Id_utilisateur: id }
        })
        .then(function(){
            return res.status(200).json({'Reponse': 'Utilisateur supprimé'});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        })
    },

    // Others functions 

    getAllScoresByUserId: function(req, res, next){

        const { id } = req.params;

        models.utilisateurs.findAll({
            attributes: ['Id_utilisateur', 'Nom', 'Prenom', 'Email', 'Date_naissance', 'Date_enregistrement', 'Image_utilisateur'],
            where: { Id_utilisateur: id },
            include: [{
                model: models.score,
            }]
        })
        .then(function(score){
            if(score){
                return res.status(200).json(score);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },
}