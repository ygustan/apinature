const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var questions_quiz = sequelize.define('questions_quiz', {
    Id_question: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Question_multiple: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'questions_quiz',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_question" },
        ]
      },
    ]
  });

  questions_quiz.associate = function(models){
    questions_quiz.belongsToMany(models.quiz, { through: models.lien_question, foreignKey: 'Id_question' });
    questions_quiz.belongsToMany(models.reponses_quiz, { through: models.lien_reponse, foreignKey: 'Id_question' });
  };
  return questions_quiz;
};
