const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lien_parent', {
    Id_utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_utilisateur_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'lien_parent',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_utilisateur" },
          { name: "Id_utilisateur_1" },
        ]
      },
      {
        name: "Id_utilisateur_1",
        using: "BTREE",
        fields: [
          { name: "Id_utilisateur_1" },
        ]
      },
    ]
  });
};
