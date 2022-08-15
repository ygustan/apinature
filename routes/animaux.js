const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt.utils');
const { ctrlAnimaux , ctrlHabitatAnimaux, ctrlRegimeAlimentaire, ctrlCategorieAnimaux, ctrlControl } = require('../controllers/index');


// Route :: Animal

router.route('/animal/')
    .get(ctrlAnimaux.getAllAnimals)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlAnimaux.postAnimal);

router.route('/animal/:id')
    .get(ctrlAnimaux.getAnimalById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlAnimaux.updateAnimalById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlAnimaux.deleteAnimalById);

// Route :: Categorie -> Animaux

//router.route('')
//    .get(ctrlAnimaux.getAnimauxByCategorie);

// Route :: Regime Alimentaire

router.route('/regime/')
    .get(ctrlRegimeAlimentaire.getAllRegimeAlimentaire)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlRegimeAlimentaire.postRegimeAlimentaire);

router.route('/regime/:id')
    .get(ctrlRegimeAlimentaire.getRegimeAlimentaireById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlRegimeAlimentaire.updateRegimeAlimentaireById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlRegimeAlimentaire.deleteRegimeAlimentaireById);

// Route :: Habitat

router.route('/habitat')
    .get(ctrlHabitatAnimaux.getAllHabitatAnimaux)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlHabitatAnimaux.postHabitatAnimaux);

router.route('/habitat/:id')
    .get(ctrlHabitatAnimaux.getHabitatAnimauxById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlHabitatAnimaux.updateHabitatAnimauxById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlHabitatAnimaux.deleteHabitatAnimauxById);

// Route :: Categorie

router.route('/categorie/animaux')
    .get(ctrlCategorieAnimaux.getAllCategorieAnimaux)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlCategorieAnimaux.postCategorieAnimaux);

router.route('/categorie/animaux/:id')
    .get(ctrlCategorieAnimaux.getCategorieAnimauxById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlCategorieAnimaux.updateCategorieAnimauxById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlCategorieAnimaux.deleteCategorieAnimauxById);


module.exports = router;
    