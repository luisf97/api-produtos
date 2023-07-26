'use strict';
const uuid = require('uuid')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Products', [
      {
        id: uuid.v4(),
        name: 'Geladeira',
        description: "Branca",
        price: 2999,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: uuid.v4(),
        name: 'Fogão',
        description: "Preto",
        price: 1125,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: uuid.v4(),
        name: 'Televisão',
        description: "44 polegadas",
        price: 1800,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        id: uuid.v4(),
        name: 'Cama',
        description: "Queen",
        price: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
