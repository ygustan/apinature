const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lien_role', {
    Id_utilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'lien_role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_utilisateur" },
          { name: "Id_role" },
        ]
      },
      {
        name: "Id_role",
        using: "BTREE",
        fields: [
          { name: "Id_role" },
        ]
      },
    ]
  });
};
