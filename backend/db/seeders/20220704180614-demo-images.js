'use strict';

const sampleImages = [
  //seeding groups
  {
    groupId: 1,
    imageUrl: 'group-1-testImage-1-Url'
  },
  {
    groupId: 1,
    imageUrl: 'group-1-testImage-2-Url'
  },
  {
    groupId: 1,
    imageUrl: 'group-1-testImage-3-Url'
  },
  {
    groupId: 1,
    imageUrl: 'group-1-testImage-4-Url'
  },
  {
    groupId: 1,
    imageUrl: 'group-1-testImage-5-Url'
  },
  {
    groupId: 2,
    imageUrl: 'group-2-testImage-1-Url'
  },
  {
    groupId: 2,
    imageUrl: 'group-2-testImage-2-Url'
  },
  {
    groupId: 2,
    imageUrl: 'group-2-testImage-3-Url'
  },
  {
    groupId: 2,
    imageUrl: 'group-2-testImage-4-Url'
  },
  {
    groupId: 3,
    imageUrl: 'group-3-testImage-1-Url'
  },
  {
    groupId: 3,
    imageUrl: 'group-3-testImage-2-Url'
  },
  {
    groupId: 3,
    imageUrl: 'group-3-testImage-3-Url'
  },
  {
    groupId: 4,
    imageUrl: 'group-4-testImage-1-Url'
  },
  {
    groupId: 4,
    imageUrl: 'group-4-testImage-2-Url'
  },
  {
    groupId: 5,
    imageUrl: 'group-5-testImage-1-Url'
  },
  //seeding Venues
  {
    venueId: 1,
    imageUrl: 'venue-1-testImage-1-Url'
  },
  {
    venueId: 2,
    imageUrl: 'venue-2-testImage-1-Url'
  },
  {
    venueId: 2,
    imageUrl: 'venue-2-testImage-2-Url'
  },
  {
    venueId: 3,
    imageUrl: 'venue-3-testImage-1-Url'
  },
  {
    venueId: 3,
    imageUrl: 'venue-3-testImage-2-Url'
  },
  {
    venueId: 3,
    imageUrl: 'venue-3-testImage-3-Url'
  },
  {
    venueId: 4,
    imageUrl: 'venue-4-testImage-1-Url'
  },
  {
    venueId: 4,
    imageUrl: 'venue-4-testImage-2-Url'
  },
  {
    venueId: 4,
    imageUrl: 'venue-4-testImage-3-Url'
  },{
    venueId: 4,
    imageUrl: 'venue-4-testImage-4-Url'
  },
  {
    venueId: 5,
    imageUrl: 'venue-5-testImage-1-Url'
  },
  {
    venueId: 5,
    imageUrl: 'venue-5-testImage-2-Url'
  },
  {
    venueId: 5,
    imageUrl: 'venue-5-testImage-3-Url'
  },
  {
    venueId: 5,
    imageUrl: 'venue-5-testImage-4-Url'
  },
  {
    venueId: 5,
    imageUrl: 'venue-5-testImage-5-Url'
  },
  {
    venueId: 6,
    imageUrl: 'venue-6-testImage-1-Url'
  },
  {
    venueId: 6,
    imageUrl: 'venue-6-testImage-2-Url'
  },
  {
    venueId: 6,
    imageUrl: 'venue-6-testImage-3-Url'
  },
  {
    venueId: 7,
    imageUrl: 'venue-7-testImage-1-Url'
  },
  {
    venueId: 7,
    imageUrl: 'venue-7-testImage-2-Url'
  },
  {
    venueId: 8,
    imageUrl: 'venue-8-testImage-1-Url'
  },
  {
    venueId: 8,
    imageUrl: 'venue-8-testImage-2-Url'
  },
  {
    venueId: 9,
    imageUrl: 'venue-9-testImage-1-Url'
  },
  {
    venueId: 9,
    imageUrl: 'venue-9-testImage-2-Url'
  },
  {
    venueId: 9,
    imageUrl: 'venue-9-testImage-3-Url'
  },
  {
    venueId: 9,
    imageUrl: 'venue-9-testImage-4-Url'
  },
  //seeding events
  {
    eventId: 1,
    imageUrl: 'event-1-testImage-1-Url'
  },
  {
    eventId: 2,
    imageUrl: 'event-2-testImage-1-Url'
  },
  {
    eventId: 2,
    imageUrl: 'event-2-testImage-2-Url'
  },
  {
    eventId: 3,
    imageUrl: 'event-3-testImage-1-Url'
  },
  {
    eventId: 3,
    imageUrl: 'event-3-testImage-2-Url'
  },
  {
    eventId: 3,
    imageUrl: 'event-3-testImage-3-Url'
  },
  {
    eventId: 4,
    imageUrl: 'event-4-testImage-1-Url'
  },
  {
    eventId: 4,
    imageUrl: 'event-4-testImage-2-Url'
  },
  {
    eventId: 4,
    imageUrl: 'event-4-testImage-3-Url'
  },{
    eventId: 4,
    imageUrl: 'event-4-testImage-4-Url'
  },
  {
    eventId: 5,
    imageUrl: 'event-5-testImage-1-Url'
  },
  {
    eventId: 5,
    imageUrl: 'event-5-testImage-2-Url'
  },
  {
    eventId: 5,
    imageUrl: 'event-5-testImage-3-Url'
  },
  {
    eventId: 5,
    imageUrl: 'event-5-testImage-4-Url'
  },
  {
    eventId: 5,
    imageUrl: 'event-5-testImage-5-Url'
  },
  {
    eventId: 6,
    imageUrl: 'event-6-testImage-1-Url'
  },
  {
    eventId: 6,
    imageUrl: 'event-6-testImage-2-Url'
  },
  {
    eventId: 7,
    imageUrl: 'event-7-testImage-1-Url'
  },
  {
    eventId: 7,
    imageUrl: 'event-7-testImage-2-Url'
  },
  {
    eventId: 7,
    imageUrl: 'event-7-testImage-3-Url'
  },
  {
    eventId: 8,
    imageUrl: 'event-8-testImage-1-Url'
  },
  {
    eventId: 8,
    imageUrl: 'event-8-testImage-2-Url'
  },
  {
    eventId: 9,
    imageUrl: 'event-9-testImage-1-Url'
  },
  {
    eventId: 9,
    imageUrl: 'event-9-testImage-2-Url'
  },
  {
    eventId: 9,
    imageUrl: 'event-9-testImage-3-Url'
  },
  {
    eventId: 9,
    imageUrl: 'event-9-testImage-4-Url'
  },
  {
    eventId: 9,
    imageUrl: 'event-9-testImage-5-Url'
  },
  {
    eventId: 10,
    imageUrl: 'event-10-testImage-1-Url'
  },
  {
    eventId: 10,
    imageUrl: 'event-10-testImage-2-Url'
  },
  {
    eventId: 10,
    imageUrl: 'event-10-testImage-3-Url'
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
