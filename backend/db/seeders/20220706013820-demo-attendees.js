'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Attendees', [
      {
        eventId: 3,
        attendeeId: 1,
        status: "Member"
      },
      {
        eventId: 4,
        attendeeId: 1,
        status: "Pending"
      },
      {
        eventId: 6,
        attendeeId: 1,
        status: "Waitlist"
      },
      {
        eventId: 4,
        attendeeId: 2,
        status: "Member"
      },
      {
        eventId: 1,
        attendeeId: 3,
        status: "Member"
      },
      {
        eventId: 2,
        attendeeId: 3,
        status: "Member"
      },
      {
        eventId: 5,
        attendeeId: 3,
        status: "Pending"
      },
      {
        eventId: 10,
        attendeeId: 3,
        status: "Pending"
      },
      {
        eventId: 9,
        attendeeId: 4,
        status: "Waitlist"
      },
      {
        eventId: 6,
        attendeeId: 4,
        status: "Member"
      },
      {
        eventId: 6,
        attendeeId: 5,
        status: "Pending"
      },
      {
        eventId: 6,
        attendeeId: 6,
        status: "Member"
      },
      {
        eventId: 7,
        attendeeId: 2,
        status: "Member"
      },
      {
        eventId: 8,
        attendeeId: 2,
        status: "Member"
      },
      {
        eventId: 7,
        attendeeId: 3,
        status: "Waitlist"
      },
      {
        eventId: 8,
        attendeeId: 3,
        status: "Member"
      },
      {
        eventId: 8,
        attendeeId: 4,
        status: "Waitlist"
      },
      {
        eventId: 7,
        attendeeId: 5,
        status: "Member"
      },
      {
        eventId: 8,
        attendeeId: 5,
        status: "Pending"
      },
      {
        eventId: 7,
        attendeeId: 6,
        status: "Pending"
      },
      {
        eventId: 8,
        attendeeId: 6,
        status: "Member"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Attendees', {}, {});
  }
};
