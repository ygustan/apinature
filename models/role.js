const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define('role', {
    Id_role: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nom: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_role" },
        ]
      },
    ]
  });

  role.associate = function(models){
    role.belongsToMany(models.utilisateurs, {
      through: models.lien_role,
      foreignKey: 'Id_role'
    });
  };
  return role;
};
