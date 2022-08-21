const ctrlUtilisateur = require('./utilisateur/utilisateur');
const ctrlRole = require('./utilisateur/role');
const ctrlScore = require('./utilisateur/score');

const ctrlAnimaux = require('./animaux/animaux');
const ctrlHabitatAnimaux = require('./animaux/habitat_animaux');
const ctrlCategorieAnimaux = require('./animaux/categorie_animaux');
const ctrlRegimeAlimentaire = require('./animaux/regime_alimentaire');

const ctrlActualite = require('./actualite/actualite');
const ctrlCategorieActualite = require('./actualite/categorie_actualite');

const ctrlLogin = require('./auth/login');
const ctrlControl = require('./control/control')

const ctrlQuiz = require('./quiz/quiz');
const ctrlTypeQuiz = require('./quiz/type_quiz');
const ctrlQuestion = require('./quiz/questions_quiz');
const ctrlReponse = require('./quiz/reponses_quiz');

const ctrlNewsletter = require('./store/newsletter');
const ctrlProduit = require('./store/produit');
const ctrlCategorieProduit = require('./store/categorie_produit');

module.exports = { 
    ctrlUtilisateur,
    ctrlRole,
    ctrlScore, 
    ctrlAnimaux,
    ctrlHabitatAnimaux,
    ctrlCategorieAnimaux,
    ctrlRegimeAlimentaire,
    ctrlActualite,
    ctrlCategorieActualite,
    ctrlLogin,
    ctrlControl,
    ctrlQuiz,
    ctrlTypeQuiz,
    ctrlReponse,
    ctrlQuestion,
    ctrlNewsletter,
    ctrlCategorieProduit,
    ctrlProduit
};