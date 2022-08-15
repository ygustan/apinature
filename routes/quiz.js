const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt.utils');
const { ctrlQuiz, ctrlReponse, ctrlTypeQuiz, ctrlQuestion, ctrlControl } = require('../controllers/index');


// Route :: Quiz

router.route('/quiz')
    .get(ctrlQuiz.getAllQuiz)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlQuiz.postQuiz);

router.route('/quiz/:id')
    .get(ctrlQuiz.getQuizById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlQuiz.updateQuizById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlQuiz.deleteQuizById);

// Route :: Quiz -> Question

router.route('/quizquestion/:id')
    .get(ctrlQuiz.getQuizWithQuestionsByQuizId);

// Route :: Question -> Response
router.route('/questionreponse/:id')
    .get(ctrlQuiz.getResponsesByQuestionId);

router.route('/correctereponse/:id')
    .get(ctrlQuiz.getResponseCorrectByQuestionId);

// Route :: Type Quiz

router.route('/typequiz')
    .get(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlTypeQuiz.getAllTypesQuiz)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlTypeQuiz.postTypeQuiz);

router.route('/typequiz/:id')
    .get(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlTypeQuiz.getTypeQuizById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlTypeQuiz.updateTypeQuizById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlTypeQuiz.deleteTypeQuizById);

// Route :: Question

router.route('/question')
    .get(ctrlQuestion.getAllQuestions)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlQuestion.postQuestion);

router.route('/question/:id')
    .get(ctrlQuestion.getQuestionById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlQuestion.updateQuestionById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlQuestion.deleteQuestionById);

// Route :: Reponse

router.route('/reponse')
    .get(ctrlReponse.getAllReponses)
    .post(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlReponse.postReponse);

router.route('/reponse/:id')
    .get(ctrlReponse.getReponseById)
    .put(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlReponse.updateReponseById)
    .delete(jwtUtils.authenticateToken, ctrlControl.autorizationAdmin, ctrlReponse.deleteReponseById);
 
module.exports = router;