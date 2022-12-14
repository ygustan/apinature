const models = require('../../models');
const bcrypt = require('bcrypt');
const jwtUtils = require('../../utils/jwt.utils');
module.exports = {

    token: function(req, res, next){
        
    },

    login: function(req, res, next){

        const email = req.body.email;
        const password = req.body.password;

        models.utilisateurs.findOne({
            where: { Email: email },
            include: [{
                model: models.role,
                through: { attributes: [] }
            }]
        })
        .then(function(user){
            if(user){
                bcrypt.compare(password, user.Password, function(errBycrypt, resBycrypt){
                    if(resBycrypt){
                        const token = jwtUtils.signUserToken(user);
                        user.Password = '';
                        return res.status(200).json({
                            'Token': "Bearer "+token,
                            'Id_utilisateur': user.Id_utilisateur,
                            'user': user
                        });
                        
                    } else {
                        return res.status(403).json({'erreur': 'Mot de passe invalide'});
                    }
                });
            } else {
                return res.status(403).json({'erreur': 'L\'utilisateur n\'existe pas'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'erreur': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    logout: function(req, res, next){
        
    },

}