'use strict';

const sampleImages = [
  //seeding groups
  {
    groupId: 1,
    imageURL: 'group-1-testImage-1-URL'
  },
  {
    groupId: 1,
    imageURL: 'group-1-testImage-2-URL'
  },
  {
    groupId: 1,
    imageURL: 'group-1-testImage-3-URL'
  },
  {
    groupId: 1,
    imageURL: 'group-1-testImage-4-URL'
  },
  {
    groupId: 1,
    imageURL: 'group-1-testImage-5-URL'
  },
  {
    groupId: 2,
    imageURL: 'group-2-testImage-1-URL'
  },
  {
    groupId: 2,
    imageURL: 'group-2-testImage-2-URL'
  },
  {
    groupId: 2,
    imageURL: 'group-2-testImage-3-URL'
  },
  {
    groupId: 2,
    imageURL: 'group-2-testImage-4-URL'
  },
  {
    groupId: 3,
    imageURL: 'group-3-testImage-1-URL'
  },
  {
    groupId: 3,
    imageURL: 'group-3-testImage-2-URL'
  },
  {
    groupId: 3,
    imageURL: 'group-3-testImage-3-URL'
  },
  {
    groupId: 4,
    imageURL: 'group-4-testImage-1-URL'
  },
  {
    groupId: 4,
    imageURL: 'group-4-testImage-2-URL'
  },
  {
    groupId: 5,
    imageURL: 'group-5-testImage-1-URL'
  },
  //seeding Venues
  {
    venueId: 1,
    imageURL: 'venue-1-testImage-1-URL'
  },
  {
    venueId: 2,
    imageURL: 'venue-2-testImage-1-URL'
  },
  {
    venueId: 2,
    imageURL: 'venue-2-testImage-2-URL'
  },
  {
    venueId: 3,
    imageURL: 'venue-3-testImage-1-URL'
  },
  {
    venueId: 3,
    imageURL: 'venue-3-testImage-2-URL'
  },
  {
    venueId: 3,
    imageURL: 'venue-3-testImage-3-URL'
  },
  {
    venueId: 4,
    imageURL: 'venue-4-testImage-1-URL'
  },
  {
    venueId: 4,
    imageURL: 'venue-4-testImage-2-URL'
  },
  {
    venueId: 4,
    imageURL: 'venue-4-testImage-3-URL'
  },{
    venueId: 4,
    imageURL: 'venue-4-testImage-4-URL'
  },
  {
    venueId: 5,
    imageURL: 'venue-5-testImage-1-URL'
  },
  {
    venueId: 5,
    imageURL: 'venue-5-testImage-2-URL'
  },
  {
    venueId: 5,
    imageURL: 'venue-5-testImage-3-URL'
  },
  {
    venueId: 5,
    imageURL: 'venue-5-testImage-4-URL'
  },
  {
    venueId: 5,
    imageURL: 'venue-5-testImage-5-URL'
  },
  {
    venueId: 6,
    imageURL: 'venue-6-testImage-1-URL'
  },
  {
    venueId: 6,
    imageURL: 'venue-6-testImage-2-URL'
  },
  {
    venueId: 6,
    imageURL: 'venue-6-testImage-3-URL'
  },
  {
    venueId: 7,
    imageURL: 'venue-7-testImage-1-URL'
  },
  {
    venueId: 7,
    imageURL: 'venue-7-testImage-2-URL'
  },
  {
    venueId: 8,
    imageURL: 'venue-8-testImage-1-URL'
  },
  {
    venueId: 8,
    imageURL: 'venue-8-testImage-2-URL'
  },
  {
    venueId: 9,
    imageURL: 'venue-9-testImage-1-URL'
  },
  {
    venueId: 9,
    imageURL: 'venue-9-testImage-2-URL'
  },
  {
    venueId: 9,
    imageURL: 'venue-9-testImage-3-URL'
  },
  {
    venueId: 9,
    imageURL: 'venue-9-testImage-4-URL'
  },
  //seeding events
  {
    eventId: 1,
    imageURL: 'event-1-testImage-1-URL'
  },
  {
    eventId: 2,
    imageURL: 'event-2-testImage-1-URL'
  },
  {
    eventId: 2,
    imageURL: 'event-2-testImage-2-URL'
  },
  {
    eventId: 3,
    imageURL: 'event-3-testImage-1-URL'
  },
  {
    eventId: 3,
    imageURL: 'event-3-testImage-2-URL'
  },
  {
    eventId: 3,
    imageURL: 'event-3-testImage-3-URL'
  },
  {
    eventId: 4,
    imageURL: 'event-4-testImage-1-URL'
  },
  {
    eventId: 4,
    imageURL: 'event-4-testImage-2-URL'
  },
  {
    eventId: 4,
    imageURL: 'event-4-testImage-3-URL'
  },{
    eventId: 4,
    imageURL: 'event-4-testImage-4-URL'
  },
  {
    eventId: 5,
    imageURL: 'event-5-testImage-1-URL'
  },
  {
    eventId: 5,
    imageURL: 'event-5-testImage-2-URL'
  },
  {
    eventId: 5,
    imageURL: 'event-5-testImage-3-URL'
  },
  {
    eventId: 5,
    imageURL: 'event-5-testImage-4-URL'
  },
  {
    eventId: 5,
    imageURL: 'event-5-testImage-5-URL'
  },
  {
    eventId: 6,
    imageURL: 'event-6-testImage-1-URL'
  },
  {
    eventId: 6,
    imageURL: 'event-6-testImage-2-URL'
  },
  {
    eventId: 7,
    imageURL: 'event-7-testImage-1-URL'
  },
  {
    eventId: 7,
    imageURL: 'event-7-testImage-2-URL'
  },
  {
    eventId: 7,
    imageURL: 'event-7-testImage-3-URL'
  },
  {
    eventId: 8,
    imageURL: 'event-8-testImage-1-URL'
  },
  {
    eventId: 8,
    imageURL: 'event-8-testImage-2-URL'
  },
  {
    eventId: 9,
    imageURL: 'event-9-testImage-1-URL'
  },
  {
    eventId: 9,
    imageURL: 'event-9-testImage-2-URL'
  },
  {
    eventId: 9,
    imageURL: 'event-9-testImage-3-URL'
  },
  {
    eventId: 9,
    imageURL: 'event-9-testImage-4-URL'
  },
  {
    eventId: 9,
    imageURL: 'event-9-testImage-5-URL'
  },
  {
    eventId: 10,
    imageURL: 'event-10-testImage-1-URL'
  },
  {
    eventId: 10,
    imageURL: 'event-10-testImage-2-URL'
  },
  {
    eventId: 10,
    imageURL: 'event-10-testImage-3-URL'
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', sampleImages , {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', {} , {})
  }
};
