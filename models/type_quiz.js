const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var type_quiz = sequelize.define('type_quiz', {
    Id_type: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nom_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'type_quiz',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_type" },
        ]
      },
    ]
  });

  type_quiz.associate = function(models){
    type_quiz.hasMany(models.quiz, { foreignKey: 'Id_type' });
  };
  return type_quiz;
};
