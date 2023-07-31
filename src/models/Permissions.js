'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permissions.belongsToMany(models.Users, {
        through: models.Users_Permissions,
        as: 'permissions_users',
        foreignKey: "permission_id",
      })

      Permissions.belongsToMany(models.Roles, {
        through: models.Roles_Permissions,
        as: 'permissions_roles',
        foreignKey: "permission_id"
      })
    }
  }
  Permissions.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permissions',
    paranoid: true
  });
  return Permissions;
};