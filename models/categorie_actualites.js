const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var categorie_actualites = sequelize.define('categorie_actualites', {
    Id_catego_actu: {
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
    tableName: 'categorie_actualites',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_catego_actu" },
        ]
      },
    ]
  });

  categorie_actualites.associate = function(models){
    categorie_actualites.belongsToMany(models.actualites, { through: models.lien_categorie, foreignKey: 'Id_catego_actu' });
  };
  return categorie_actualites;
};
