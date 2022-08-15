const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lien_categorie', {
    Id_actualite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_catego_actu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'lien_categorie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_actualite" },
          { name: "Id_catego_actu" },
        ]
      },
      {
        name: "Id_catego_actu",
        using: "BTREE",
        fields: [
          { name: "Id_catego_actu" },
        ]
      },
    ]
  });
};
