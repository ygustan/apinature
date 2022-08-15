const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var score = sequelize.define('score', {
    Id_score: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Etat_score: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Json_historique: {
      type: DataTypes.JSON,
      allowNull: true
    },
    Date_score: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Id_quiz: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "Id_quiz"
    }
  }, {
    sequelize,
    tableName: 'score',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_score" },
        ]
      },
      {
        name: "Id_quiz",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_quiz" },
        ]
      },
    ]
  });

  score.associate = function(models){
    score.belongsToMany(models.utilisateurs, { through: models.lien_score, foreignKey: 'Id_score' });
    score.belongsTo(models.quiz, { foreignKey: 'Id_quiz' });
  };
  return score;
};
