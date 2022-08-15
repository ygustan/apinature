var DataTypes = require("sequelize").DataTypes;
var _actualites = require("./actualites");
var _animaux = require("./animaux");
var _categorie_actualites = require("./categorie_actualites");
var _categorie_animaux = require("./categorie_animaux");
var _habitat_animaux = require("./habitat_animaux");
var _lien_categorie = require("./lien_categorie");
var _lien_habitat = require("./lien_habitat");
var _lien_parent = require("./lien_parent");
var _lien_question = require("./lien_question");
var _lien_reponse = require("./lien_reponse");
var _lien_role = require("./lien_role");
var _lien_score = require("./lien_score");
var _questions_quiz = require("./questions_quiz");
var _quiz = require("./quiz");
var _regime_alimentaire = require("./regime_alimentaire");
var _reponses_quiz = require("./reponses_quiz");
var _role = require("./role");
var _score = require("./score");
var _type_quiz = require("./type_quiz");
var _utilisateurs = require("./utilisateurs");

function initModels(sequelize) {
  var actualites = _actualites(sequelize, DataTypes);
  var animaux = _animaux(sequelize, DataTypes);
  var categorie_actualites = _categorie_actualites(sequelize, DataTypes);
  var categorie_animaux = _categorie_animaux(sequelize, DataTypes);
  var habitat_animaux = _habitat_animaux(sequelize, DataTypes);
  var lien_categorie = _lien_categorie(sequelize, DataTypes);
  var lien_habitat = _lien_habitat(sequelize, DataTypes);
  var lien_parent = _lien_parent(sequelize, DataTypes);
  var lien_question = _lien_question(sequelize, DataTypes);
  var lien_reponse = _lien_reponse(sequelize, DataTypes);
  var lien_role = _lien_role(sequelize, DataTypes);
  var lien_score = _lien_score(sequelize, DataTypes);
  var questions_quiz = _questions_quiz(sequelize, DataTypes);
  var quiz = _quiz(sequelize, DataTypes);
  var regime_alimentaire = _regime_alimentaire(sequelize, DataTypes);
  var reponses_quiz = _reponses_quiz(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var score = _score(sequelize, DataTypes);
  var type_quiz = _type_quiz(sequelize, DataTypes);
  var utilisateurs = _utilisateurs(sequelize, DataTypes);


  animaux.belongsToMany(habitat_animaux, { through: 'lien_habitat' });
  habitat_animaux.belongsToMany(animaux, { through: 'lien_habitat' });

  quiz.belongsToMany(questions_quiz, { through: 'lien_question' });
  questions_quiz.belongsToMany(quiz, { through: 'lien_question' });

  questions_quiz.belongsToMany(reponses_quiz, { through: 'lien_reponse' });
  reponses_quiz.belongsToMany(questions_quiz, { through: 'lien_reponse' });

  utilisateurs.belongsToMany(role, { through: lien_role, foreignKey: utilisateurs.Id_utilisateur });
  role.belongsToMany(utilisateurs, { through: lien_role, foreignKey: role.Id_role  });

  utilisateurs.belongsToMany(score, { through: 'lien_score' });
  score.belongsToMany(utilisateurs, { through: 'lien_score' });

  actualites.belongsToMany(categorie_actualites, { through: 'lien_categorie' });
  categorie_actualites.belongsToMany(actualites, { through: 'lien_categorie' });


  return {
    actualites,
    animaux,
    categorie_actualites,
    categorie_animaux,
    habitat_animaux,
    lien_categorie,
    lien_habitat,
    lien_parent,
    lien_question,
    lien_reponse,
    lien_role,
    lien_score,
    questions_quiz,
    quiz,
    regime_alimentaire,
    reponses_quiz,
    role,
    score,
    type_quiz,
    utilisateurs,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
