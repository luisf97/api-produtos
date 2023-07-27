'use strict';
const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Permissions', [
      {
        id: uuid.v4(),
        name: 'Cadastrar',
        description: 'Responsável por cadastro no sistema',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: uuid.v4(),
        name: 'Editar',
        description: 'Responsável por editar no sistema',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: uuid.v4(),
        name: 'Deletar',
        description: 'Responsável por deletar no sistema',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
