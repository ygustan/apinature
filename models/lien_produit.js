const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lien_produit', {
    Id_produit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_catego_produit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'lien_produit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_produit" },
          { name: "Id_catego_produit" },
        ]
      },
      {
        name: "Id_catego_produit",
        using: "BTREE",
        fields: [
          { name: "Id_catego_produit" },
        ]
      },
    ]
  });
};
