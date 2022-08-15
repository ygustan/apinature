const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var reponses_quiz = sequelize.define('reponses_quiz', {
    Id_reponse: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Description_reponse: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Bonne_reponse: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'reponses_quiz',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_reponse" },
        ]
      },
    ]
  });

  reponses_quiz.associate = function(models){
    reponses_quiz.belongsToMany(models.questions_quiz, { through: models.lien_reponse, foreignKey: 'Id_reponse' });
  };
  return reponses_quiz;
};
