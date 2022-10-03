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
      {
        groupId: 6,
        memberId: 2,
        status: 'Member'
      },
      {
        groupId: 6,
        memberId: 3,
        status: 'Member'
      },
      {
        groupId: 6,
        memberId: 4,
        status: 'Member'
      },
      {
        groupId: 6,
        memberId: 5,
        status: 'Member'
      },
      {
        groupId: 6,
        memberId: 6,
        status: 'Member'
      },
      {
        groupId: 1,
        memberId: 7,
        status: 'Member'
      },
      {
        groupId: 1,
        memberId: 8,
        status: 'Member'
      },
      {
        groupId: 1,
        memberId: 9,
        status: 'Member'
      },
      {
        groupId: 1,
        memberId: 10,
        status: 'Member'
      },
      {
        groupId: 2,
        memberId: 11,
        status: 'Member'
      },
      {
        groupId: 2,
        memberId: 12,
        status: 'Member'
      },
      {
        groupId: 2,
        memberId: 13,
        status: 'Member'
      },
      {
        groupId: 2,
        memberId: 14,
        status: 'Member'
      },
      {
        groupId: 2,
        memberId: 15,
        status: 'Member'
      },
      {
        groupId: 3,
        memberId: 16,
        status: 'Member'
      },
      {
        groupId: 3,
        memberId: 17,
        status: 'Member'
      },
      {
        groupId: 3,
        memberId: 18,
        status: 'Member'
      },
      {
        groupId: 3,
        memberId: 19,
        status: 'Member'
      },
      {
        groupId: 3,
        memberId: 20,
        status: 'Member'
      },
      {
        groupId: 4,
        memberId: 21,
        status: 'Member'
      },
      {
        groupId: 4,
        memberId: 22,
        status: 'Member'
      },
      {
        groupId: 4,
        memberId: 23,
        status: 'Member'
      },
      {
        groupId: 4,
        memberId: 24,
        status: 'Member'
      },
      {
        groupId: 4,
        memberId: 25,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 16,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 17,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 18,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 19,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 20,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 21,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 22,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 23,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 24,
        status: 'Member'
      },
      {
        groupId: 5,
        memberId: 25,
        status: 'Member'
      },
      {
        groupId: 6,
        memberId: 21,
        status: 'Member'
      },
      {
        groupId: 6,
        memberId: 22,
        status: 'Member'
      },
      {
        groupId: 6,
        memberId: 23,
        status: 'Member'
      },
      {
        groupId: 6,
        memberId: 24,
        status: 'Member'
      },
      {
        groupId: 6,
        memberId: 25,
        status: 'Member'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Members', {}, {});
  }
};
