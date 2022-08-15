const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lien_habitat', {
    Id_animal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_habitat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'lien_habitat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_animal" },
          { name: "Id_habitat" },
        ]
      },
      {
        name: "Id_habitat",
        using: "BTREE",
        fields: [
          { name: "Id_habitat" },
        ]
      },
    ]
  });
};
