const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var regime_alimentaire = sequelize.define('regime_alimentaire', {
    Id_regime: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nom_regime: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Description_regime: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'regime_alimentaire',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_regime" },
        ]
      },
    ]
  });

  regime_alimentaire.associate = function(models){
    regime_alimentaire.hasMany(models.animaux, { foreignKey: 'Id_regime' });
  };
  return regime_alimentaire;
};
