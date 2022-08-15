const models = require('../../models');

module.exports = {

    getAllRoles: function(req, res, next){
        models.role.findAll({})
        .then(function(roles){
            return res.status(200).json(roles);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    getRoleById: function(req, res, next){

        const { id } = req.params;

        models.role.findOne({
            where: {Id_role: id}
        })
        .then(function(role){
            return res.status(200).json(role);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    postRole: function(req, res, next){

        const nom = req.body.nom;

        models.role.create({
            Nom: nom
        })
        .then(function(role){
            return res.status(200).json(role);
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    updateRoleById: function(req, res, next){

        const { id } = req.params;
        const nom = req.body.nom;

        models.role.update({
            Nom: nom
        },{
            where: { Id_role: id }
        })
        .then(function(role){
            if(role){
                return res.status(200).json({'Reponse': 'Le role a été mise à jour'});
            }else {
                return res.status(404).json({'Reponse': 'Le role est introuvable'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    deleteRoleById: function(req, res, next){

        const { id } = req.params;

        models.role.destroy({
            where: {Id_role: id}
        })
        .then(function(role){
            return res.status(200).json({'Reponse':'Le role a été supprimée'});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}