const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var quiz = sequelize.define('quiz', {
    Id_quiz: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nom_quiz: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Date_quiz: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Id_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'quiz',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_quiz" },
        ]
      },
      {
        name: "Id_type",
        using: "BTREE",
        fields: [
          { name: "Id_type" },
        ]
      },
    ]
  });

  quiz.associate = function(models){
    quiz.belongsToMany(models.questions_quiz, { through: models.lien_question, foreignKey: 'Id_quiz' });
    quiz.belongsTo(models.type_quiz, { foreignKey: 'Id_type' });
    quiz.hasMany(models.score, { foreignKey: 'Id_quiz' });
  };
  return quiz;
};
