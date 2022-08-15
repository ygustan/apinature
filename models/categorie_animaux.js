const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var categorie_animaux = sequelize.define('categorie_animaux', {
    Id_catego_animaux: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Description_catego: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'categorie_animaux',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_catego_animaux" },
        ]
      },
    ]
  });

  categorie_animaux.associate = function(models){
    categorie_animaux.hasMany(models.animaux, { foreignKey: 'Id_catego_animaux' });
  };
  return categorie_animaux;
};
