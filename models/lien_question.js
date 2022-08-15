const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lien_question', {
    Id_quiz: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_question: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'lien_question',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_quiz" },
          { name: "Id_question" },
        ]
      },
      {
        name: "Id_question",
        using: "BTREE",
        fields: [
          { name: "Id_question" },
        ]
      },
    ]
  });
};
