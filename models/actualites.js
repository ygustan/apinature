const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var actualites = sequelize.define('actualites', {
    Id_actualite: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Titre_actualite: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Contenu_actualite: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Date_actualite: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'actualites',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_actualite" },
        ]
      },
    ]
  });

  actualites.associate = function(models){
    actualites.belongsToMany(models.categorie_actualites, { through: models.lien_categorie, foreignKey: 'Id_actualite' });
  };
  return actualites;
};
