const models = require('../../models');

module.exports = {

    getAllAnimals: function(req, res, next){
        models.animaux.findAll({})
        .then(function(animaux){
            return res.status(200).json(animaux);
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        })
    },

    getAnimalById: function(req, res, next){

        const { id } = req.params;

        models.animaux.findOne({
            where: { Id_animal: id },
            include: [{
                model: models.habitat_animaux,
            },{
                model: models.categorie_animaux,
            },{
                model: models.regime_alimentaire
            }],
        })
        .then(function(animal){
            if(animal){
                return res.status(200).json(animal);
            }else {
                return res.status(404).json({'Reponse': 'L\'animal est introuvable'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    postAnimal: function(req, res, next){

        const image = req.body.image;
        const nom = req.body.nom;
        const etat = req.body.etat;
        const description = req.body.description;
        const caracteristique = req.body.caracteristique;
        const esperance = req.body.esperanceVie;
        const population = req.body.population;
        const poids = req.body.poids;
        const taille = req.body.taille;
        const regimeId = req.body.regimeId;
        const categorieId = req.body.categorieId;
        const habitatId = req.body.habitatId;

        models.animaux.create({
            Image_animal: image,
            Nom_animal: nom,
            Etat_animal: etat,
            Description_animal: description,
            Caracteristique: caracteristique,
            Esperance_vie: esperance,
            Population: population,
            Poids: poids,
            Taille: taille,
            Id_regime: regimeId,
            Id_catego_animaux: categorieId
        })        
        .then(function(animal){
            models.lien_habitat.create({ Id_animal: animal.Id_animal, Id_habitat: habitatId })
            .then(function(habitat){
                if(habitat){
                    return res.status(200).json(animal);
                }else {
                    return res.status(500).json({});
                }
            }).catch(function(err){
                return res.status(500).json({'Error': `${err}`});
            });
        })
        .catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });
    },

    updateAnimalById: function(req, res, next){

        const { id } = req.params;

        const image = req.body.image;
        const nom = req.body.nom;
        const etat = req.body.etat;
        const description = req.body.description;
        const caracteristique = req.body.caracteristique;
        const esperance = req.body.esperanceVie;
        const population = req.body.population;
        const poids = req.body.poids;
        const taille = req.body.taille;
        const regimeId = req.body.regimeId;
        const categorieId = req.body.categorieId;

        models.animaux.update({
            Image_animal: image,
            Nom_animal: nom,
            Etat_animal: etat,
            Description_animal: description,
            Caracteristique: caracteristique,
            Esperance_vie: esperance,
            Population: population,
            Poids: poids,
            Taille: taille,
            Id_regime: regimeId,
            Id_catego_animaux: categorieId
        }, {
            where: { Id_animal: id }
        })        
        .then(function(animal){
            if(animal){
                return res.status(200).json(animal);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });

    },

    deleteAnimalById: function(req, res, next){

        const { id } = req.params;

        models.animaux.destroy({
            where: { Id_animal: id }
        })        
        .then(function(animal){
            return res.status(200).json({'Reponse':'L\'animal a été supprimé'});
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

    // Others functions 

    getAnimauxByCategorie: function(req, res, next){
        const { id } = req.params;

        models.categorie_animaux.findOne({
            where: { Id_catego_animaux: id },
            include: [{
                model: models.animaux
            }]
        })
        .then(function(categorieAnimaux){
            if(categorieAnimaux){
                return res.status(200).json(categorieAnimaux);
            }else {
                return res.status(404).json({});
            }
        })
        .catch(function(err){
            return res.status(500).json({'Error': 'Impossible d\'éffectuer la requête demandée'});
        });
    },

}