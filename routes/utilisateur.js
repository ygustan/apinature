const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt.utils');
const { ctrlUtilisateur , ctrlRole, ctrlScore, ctrlControl } = require('../controllers/index');


// Route :: Utilisateur

router.route('/utilisateur')
    .get(ctrlUtilisateur.getAllUsers)
    .post(ctrlUtilisateur.postUser);

router.route('/utilisateur/:id')
    .get(ctrlUtilisateur.getUserById)
    .put(ctrlUtilisateur.updateUserById)
    .delete(ctrlUtilisateur.deleteUserById);


// Route :: Utilisateur -> Score

router.route('/utilisateur/:id/score/')
    .get(jwtUtils.authenticateToken, ctrlControl.autorizationUser, ctrlUtilisateur.getAllScoresByUserId);

// Route :: Role

router.route('/role')
    .get(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlRole.getAllRoles)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlRole.postRole);

router.route('/role/:id')
    .get(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlRole.getRoleById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlRole.updateRoleById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlRole.deleteRoleById);

// Route :: Score

router.route('/score')
    .get(ctrlScore.getAllScores)
    .post(ctrlScore.postScore);

router.route('/score/:id')
    .get(ctrlScore.getScoreById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationUser, ctrlScore.updateScoreById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlScore.deleteScoreById);

// router.get('/utilisateur', ctrlUtilisateur.getAllUsers);  
module.exports = router;