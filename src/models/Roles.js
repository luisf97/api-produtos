'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.belongsToMany(models.Users, {
        through: models.Users_Roles,
        as: 'roles_users',
        foreignKey:'role_id',
      })

      Roles.belongsToMany(models.Permissions, {
        through: models.Roles_Permissions,
        as: 'roles_permissions',
        foreignKey: 'role_id'
      })
    }
  }
  Roles.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
    paranoid: true
  });
  return Roles;
};