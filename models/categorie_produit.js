const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var categorie_produit = sequelize.define('categorie_produit', {
    Id_catego_produit: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nom_categorie: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'categorie_produit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_catego_produit" },
        ]
      },
    ]
  });

  categorie_produit.associate = function(models){
    categorie_produit.belongsToMany(models.produit, { through: models.lien_produit, foreignKey: 'Id_catego_produit' });
  };
  return categorie_produit;
};
