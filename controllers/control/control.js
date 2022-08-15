const models = require('../../models');
const jwtUtils = require('../../utils/jwt.utils');

module.exports = {

    autorizationUser: function(req, res, next){
        console.log('here iam');
        const { id } = req.params;

        if(req.user["Role"] == "Administrateur"){
            next();
        }

        if(req.user["Id_utilisateur"] != id){
            return res.sendStatus(403);
        }
        next();
    },

    autorizationAdmin: function(req, res, next){
        if(req.user["Role"] != "Administrateur"){
            return res.sendStatus(403);
        }
        next();
    },

}