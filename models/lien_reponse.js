const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lien_reponse', {
    Id_question: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_reponse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'lien_reponse',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_question" },
          { name: "Id_reponse" },
        ]
      },
      {
        name: "Id_reponse",
        using: "BTREE",
        fields: [
          { name: "Id_reponse" },
        ]
      },
    ]
  });
};
