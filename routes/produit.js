const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt.utils');
const { ctrlControl, ctrlProduit, ctrlCategorieProduit } = require('../controllers/index');


// Route :: Produit

router.route('/produit')
    .get(ctrlProduit.getAllProduits)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlProduit.postProduit);

router.route('/produit/:id')
    .get(ctrlProduit.getProduitById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlProduit.updateProduitById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlProduit.deleteProduitById);


// Route :: Categorie

router.route('/categorie/produit')
    .get(ctrlCategorieProduit.getAllCategorieProduit)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlCategorieProduit.postCategorieProduit);

router.route('/categorie/produit/:id')
    .get(ctrlCategorieProduit.getCategorieProduitById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlCategorieProduit.updateCategorieProduitById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlCategorieProduit.deleteCategorieProduitById);

module.exports = router;