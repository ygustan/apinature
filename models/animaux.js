const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var animaux = sequelize.define('animaux', {
    Id_animal: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Image_animal: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Nom_animal: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Etat_animal: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Description_animal: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Caracteristique: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Esperance_vie: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Population: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Poids: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Taille: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Id_regime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Id_catego_animaux: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'animaux',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_animal" },
        ]
      },
      {
        name: "Id_regime",
        using: "BTREE",
        fields: [
          { name: "Id_regime" },
        ]
      },
      {
        name: "Id_catego_animaux",
        using: "BTREE",
        fields: [
          { name: "Id_catego_animaux" },
        ]
      },
    ]
  });

  animaux.associate = function(models){
    animaux.belongsToMany(models.habitat_animaux, { through: models.lien_habitat, foreignKey: 'Id_animal' });
    animaux.belongsTo(models.categorie_animaux, { foreignKey: 'Id_catego_animaux' });
    animaux.belongsTo(models.regime_alimentaire, { foreignKey: 'Id_regime' });
  };
  return animaux;
};
