'use strict';
const uuid = require('uuid')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Users', [
      {
        id: uuid.v4(),
        name: 'Luis Fernando',
        email: "luis@gmail.com",
        password: "101010",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
