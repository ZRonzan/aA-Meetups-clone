'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Members', [
      {
        groupId: 1,
        memberId: 2,
        status: 'Pending'
      },
      {
        groupId: 1,
        memberId: 3,
        status: 'Co-Host'
      },
      {
        groupId: 2,
        memberId: 3,
        status: 'Pending'
      },
      {
        groupId: 2,
        memberId: 4,
        status: 'Member'
      },
      {
        groupId: 2,
        memberId: 1,
        status: "Member"
      },
      {
        groupId: 3,
        memberId: 2,
        status: 'Co-Host'
      },
      {
        groupId: 4,
        memberId: 3,
        status: 'Pending'
      },
      {
        groupId: 5,
        memberId: 1,
        status: 'Co-Host'
      },
      {
        groupId: 5,
        memberId: 3,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 4,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 5,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 6,
        status: 'Pending'
      },
      {
        groupId: 3,
        memberId: 1,
        status: 'Pending'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Members', {}, {});
  }
};
