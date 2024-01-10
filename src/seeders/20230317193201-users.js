'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users',
    [{
      id: 1,
      username: 'firstuser',
      password: '123456ab',
      admin: false,
    },
    {
      id: 2,
      username: 'seconduser',
      password: '123456cd',
      admin: false,
    },
    {
      id: 3,
      username: 'admin',
      password: 's3nh4S3gur4',
      admin: true,
    }
    ], { timestamps: false });
},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
