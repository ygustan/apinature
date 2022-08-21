const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var newsletter = sequelize.define('newsletter', {
    Id_mail: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Mail: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'newsletter',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_mail" },
        ]
      },
    ]
  });

  return newsletter;
};
