'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles_Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Roles_Permissions.init({
    role_id: DataTypes.UUID,
    permisission_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Roles_Permissions',
  });
  return Roles_Permissions;
};