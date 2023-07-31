'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsToMany(models.Roles, {
        through: models.Users_Roles,
        as: 'users_roles',
        foreignKey: 'user_id'
      })

      Users.belongsToMany(models.Permissions, {
        through: models.Users_Permissions,
        as: 'users_permissions',
        foreignKey: 'user_id'
      })
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Users',
    paranoid: true
  });
  return Users;
};