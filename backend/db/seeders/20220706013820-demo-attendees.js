'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Attendees', [
      {
        eventId: 3,
        userId: 1,
        status: "Member"
      },
      {
        eventId: 4,
        userId: 1,
        status: "Pending"
      },
      {
        eventId: 6,
        userId: 1,
        status: "Waitlist"
      },
      {
        eventId: 4,
        userId: 2,
        status: "Member"
      },
      {
        eventId: 1,
        userId: 3,
        status: "Member"
      },
      {
        eventId: 2,
        userId: 3,
        status: "Member"
      },
      {
        eventId: 5,
        userId: 3,
        status: "Member"
      },
      {
        eventId: 10,
        userId: 3,
        status: "Pending"
      },
      {
        eventId: 9,
        userId: 4,
        status: "Member"
      },
      {
        eventId: 9,
        userId: 1,
        status: "Waitlist"
      },
      {
        eventId: 6,
        userId: 4,
        status: "Member"
      },
      {
        eventId: 6,
        userId: 5,
        status: "Pending"
      },
      {
        eventId: 6,
        userId: 6,
        status: "Member"
      },
      {
        eventId: 7,
        userId: 2,
        status: "Pending"
      },
      // {
      //   eventId: 8,
      //   userId: 2,
      //   status: "Member"
      // },
      {
        eventId: 7,
        userId: 3,
        status: "Waitlist"
      },
      {
        eventId: 8,
        userId: 3,
        status: "Member"
      },
      {
        eventId: 8,
        userId: 4,
        status: "Waitlist"
      },
      {
        eventId: 7,
        userId: 5,
        status: "Member"
      },
      {
        eventId: 8,
        userId: 5,
        status: "Pending"
      },
      {
        eventId: 7,
        userId: 6,
        status: "Pending"
      },
      {
        eventId: 1,
        userId: 7,
        status: "Member"
      },
      {
        eventId: 1,
        userId: 8,
        status: "Member"
      },
      {
        eventId: 1,
        userId: 9,
        status: "Member"
      },
      {
        eventId: 1,
        userId: 10,
        status: "Member"
      },
      {
        eventId: 2,
        userId: 7,
        status: "Pending"
      },
      {
        eventId: 2,
        userId: 8,
        status: "Waitlist"
      },
      {
        eventId: 2,
        userId: 9,
        status: "Member"
      },
      {
        eventId: 3,
        userId: 10,
        status: "Member"
      },
      {
        eventId: 3,
        userId: 11,
        status: 'Member'
      },
      {
        eventId: 3,
        userId: 12,
        status: 'Member'
      },
      {
        eventId: 3,
        userId: 13,
        status: 'Member'
      },
      {
        eventId: 3,
        userId: 14,
        status: 'Member'
      },
      {
        eventId: 3,
        userId: 15,
        status: 'Pending'
      },
      {
        eventId: 4,
        userId: 16,
        status: 'Member'
      },
      {
        eventId: 4,
        userId: 17,
        status: 'Member'
      },
      {
        eventId: 4,
        userId: 18,
        status: 'Member'
      },
      {
        eventId: 4,
        userId: 19,
        status: 'Member'
      },
      {
        eventId: 4,
        userId: 20,
        status: 'Member'
      },
      {
        eventId: 5,
        userId: 22,
        status: 'Waitlist'
      },
      {
        eventId: 5,
        userId: 23,
        status: 'Member'
      },
      {
        eventId: 5,
        userId: 24,
        status: 'Member'
      },
      {
        eventId: 5,
        userId: 25,
        status: 'Member'
      },
      {
        eventId: 6,
        userId: 16,
        status: 'Member'
      },
      {
        eventId: 6,
        userId: 17,
        status: 'Member'
      },
      {
        eventId: 6,
        userId: 18,
        status: 'Member'
      },
      {
        eventId: 6,
        userId: 19,
        status: 'Member'
      },
      {
        eventId: 6,
        userId: 20,
        status: 'Member'
      },
      {
        eventId: 6,
        userId: 21,
        status: 'Member'
      },
      {
        eventId: 6,
        userId: 22,
        status: 'Member'
      },
      {
        eventId: 6,
        userId: 23,
        status: 'Member'
      },
      {
        eventId: 6,
        userId: 24,
        status: 'Member'
      },
      {
        eventId: 6,
        userId: 25,
      },
      {
        eventId: 7,
        userId: 21,
        status: 'Member'
      },
      {
        eventId: 7,
        userId: 22,
        status: 'Member'
      },
      {
        eventId: 7,
        userId: 23,
        status: 'Member'
      },
      {
        eventId: 7,
        userId: 24,
        status: 'Member'
      },
      {
        eventId: 7,
        userId: 25,
        status: 'Member'
      },
      {
        eventId: 8,
        userId: 21,
        status: 'Member'
      },
      {
        eventId: 8,
        userId: 22,
        status: 'Member'
      },
      {
        eventId: 8,
        userId: 23,
        status: 'Pending'
      },
      {
        eventId: 8,
        userId: 24,
        status: 'Pending'
      },
      {
        eventId: 8,
        userId: 25,
        status: 'Pending'
      },
      {
        eventId: 10,
        userId: 21,
        status: 'Member'
      },
      {
        eventId: 10,
        userId: 22,
        status: 'Pending'
      },
      {
        eventId: 10,
        userId: 23,
        status: 'Member'
      },
      {
        eventId: 10,
        userId: 24,
        status: 'Member'
      },
      {
        eventId: 10,
        userId: 25,
        status: 'Waitlist'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Attendees', {}, {});
  }
};
