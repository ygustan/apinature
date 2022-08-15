const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var habitat_animaux = sequelize.define('habitat_animaux', {
    Id_habitat: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nom_habitat: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Description_habitat: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'habitat_animaux',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_habitat" },
        ]
      },
    ]
  });

  habitat_animaux.associate = function(models){
    habitat_animaux.belongsToMany(models.animaux, { through: models.lien_habitat, foreignKey: 'Id_habitat' });
  };
  return habitat_animaux;
};
