const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt.utils');
const { ctrlActualite, ctrlCategorieActualite, ctrlControl } = require('../controllers/index');


// Route :: Actualite

router.route('/actualite')
    .get(ctrlActualite.getAllActualites)
    .post(ctrlActualite.postActualite);

router.route('/actualite/:id')
    .get(ctrlActualite.getActualiteById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlActualite.updateActualiteById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlActualite.deleteActualiteById);

// Route :: Categorie

router.route('/categorie/actualite')
    .get(ctrlCategorieActualite.getAllCategorieActualites)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlCategorieActualite.postCategorieActualite);

router.route('/categorie/actualite/:id')
    .get(ctrlCategorieActualite.getCategorieActualiteById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlCategorieActualite.updateCategorieActualiteById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlCategorieActualite.deleteCategorieActualiteById);


module.exports = router;