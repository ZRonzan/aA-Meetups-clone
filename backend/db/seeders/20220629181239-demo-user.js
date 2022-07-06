'use strict';
//import bcrypt to generate the hash for each user
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        // username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password') //generate a hash from the password 'password'
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        email: "john.smith@gmail.com",
        // username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync("secret password")
      },
      {
        firstName: 'Fake',
        lastName: 'Usertwo',
        email: 'user2@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Fake',
        lastName: 'Userthree',
        email: 'user3@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Fake',
        lastName: 'Userfour',
        email: 'user4@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Fake',
        lastName: 'Userfive',
        email: 'user5@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Users', {
       email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io', 'user3@user.io', 'user4@user.io','user5@user.io'] }
     }, {});
  }
};
