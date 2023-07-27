'use strict';
const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Roles', [
      {
        id: uuid.v4(),
        name: 'Gerente',
        description: 'Responsável por todo o time',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: uuid.v4(),
        name: 'Coordenador',
        description: 'Responsável pelos supervisores',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: uuid.v4(),
        name: 'Supervisor',
        description: 'Responsável pelos programadores',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },      
      {
        id: uuid.v4(),
        name: 'Programador',
        description: 'Responsável por todo o time',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
