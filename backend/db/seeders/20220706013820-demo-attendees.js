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
        status: "Pending"
      },
      {
        eventId: 10,
        userId: 3,
        status: "Pending"
      },
      {
        eventId: 9,
        userId: 4,
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
        eventId: 8,
        userId: 6,
        status: "Member"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Attendees', {}, {});
  }
};
