const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var produit = sequelize.define('produit', {
    Id_produit: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nom_produit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Quantite: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Description_produit: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Prix_unitaire: {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    Image_produit: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'produit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_produit" },
        ]
      },
    ]
  });

  produit.associate = function(models){
    produit.belongsToMany(models.categorie_produit, { through: models.lien_produit, foreignKey: 'Id_produit' });
  };
  return produit;
};
