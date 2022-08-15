const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var utilisateurs = sequelize.define('utilisateurs', {
    Id_utilisateur: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Prenom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Date_naissance: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Date_enregistrement: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Image_utilisateur: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'utilisateurs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_utilisateur" },
        ]
      },
    ]
  });

  utilisateurs.associate = function(models){
    utilisateurs.belongsToMany(models.role, {
      through: models.lien_role,
      foreignKey: 'Id_utilisateur'
    });

    utilisateurs.belongsToMany(models.score, { through: models.lien_score, foreignKey: 'Id_utilisateur' });
  };
  return utilisateurs;
};
