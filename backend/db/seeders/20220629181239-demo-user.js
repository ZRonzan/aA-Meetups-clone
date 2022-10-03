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
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@gmail.com',
        // username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password') //generate a hash from the password 'password'
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: "demo@user.io",
        // username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync("secret password")
      },
      {
        firstName: 'Chris',
        lastName: 'Falden',
        email: 'user3@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Jennifer',
        lastName: 'Leslie',
        email: 'user4@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Otis',
        lastName: 'Smith',
        email: 'user5@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Sarah',
        lastName: 'Plemmens',
        email: 'user6@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Sam',
        lastName: 'Tirsch',
        email: 'user7@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Sam',
        lastName: 'Winchester',
        email: 'user8@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Dean',
        lastName: 'Winchester',
        email: 'user9@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Laura',
        lastName: 'Dennings',
        email: 'user10@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Fred',
        lastName: 'Jeffreys',
        email: 'user11@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Tina',
        lastName: 'Prune',
        email: 'user12@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Tim',
        lastName: 'Geller',
        email: 'user13@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Sabrina',
        lastName: 'Locke',
        email: 'user14@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Ryan',
        lastName: 'Smith',
        email: 'user15@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Prina',
        lastName: 'Wevvy',
        email: 'user16@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Josh',
        lastName: 'Brosh',
        email: 'user17@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Puma',
        lastName: 'Keller',
        email: 'user18@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Ewan',
        lastName: 'Quilliam',
        email: 'user19@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Freya',
        lastName: 'Louse',
        email: 'user20@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Harry',
        lastName: 'Byan',
        email: 'user21@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Louise',
        lastName: 'Tyler',
        email: 'user22@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Reece',
        lastName: 'Bryant',
        email: 'user23@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Reyna',
        lastName: 'Jules',
        email: 'user24@user.io',
        // username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Fredrick',
        lastName: 'Dennis',
        email: 'user25@user.io',
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
       email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io', 'user3@user.io', 'user4@user.io','user5@user.io','user6@user.io','user7@user.io','user8@user.io','user9@user.io','user10@user.io','user11@user.io','user12@user.io','user13@user.io','user14@user.io','user15@user.io','user16@user.io','user17@user.io','user18@user.io','user19@user.io','user20@user.io','user21@user.io','user22@user.io','user23@user.io'] }
     }, {});
  }
};
