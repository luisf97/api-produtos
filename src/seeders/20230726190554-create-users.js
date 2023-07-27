'use strict';
const uuid = require('uuid')
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {



     await queryInterface.bulkInsert('Users', [
      {
        id: uuid.v4(),
        name: 'Luis Fernando',
        email: "luis@gmail.com",
        password: await bcrypt.hash("123456", 10),
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
