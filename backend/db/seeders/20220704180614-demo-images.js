'use strict';

const sampleImages = [
  //seeding groups
  {
    uploaderId: 1,
    groupId: 1,
    imageUrl: 'group-1-testImage-1-Url'
  },
  {
    uploaderId: 1,
    groupId: 1,
    imageUrl: 'group-1-testImage-2-Url'
  },
  {
    uploaderId: 3,
    groupId: 1,
    imageUrl: 'group-1-testImage-3-Url'
  },
  {
    uploaderId: 3,
    groupId: 1,
    imageUrl: 'group-1-testImage-4-Url'
  },
  {
    uploaderId: 3,
    groupId: 1,
    imageUrl: 'group-1-testImage-5-Url'
  },
  {
    uploaderId: 2,
    groupId: 2,
    imageUrl: 'group-2-testImage-1-Url'
  },
  {
    uploaderId: 2,
    groupId: 2,
    imageUrl: 'group-2-testImage-2-Url'
  },
  {
    uploaderId: 2,
    groupId: 2,
    imageUrl: 'group-2-testImage-3-Url'
  },
  {
    uploaderId: 4,
    groupId: 2,
    imageUrl: 'group-2-testImage-4-Url'
  },
  {
    uploaderId: 3,
    groupId: 3,
    imageUrl: 'group-3-testImage-1-Url'
  },
  {
    uploaderId: 2,
    groupId: 3,
    imageUrl: 'group-3-testImage-2-Url'
  },
  {
    uploaderId: 3,
    groupId: 3,
    imageUrl: 'group-3-testImage-3-Url'
  },
  {
    uploaderId: 1,
    groupId: 4,
    imageUrl: 'group-4-testImage-1-Url'
  },
  {
    uploaderId: 1,
    groupId: 4,
    imageUrl: 'group-4-testImage-2-Url'
  },
  {
    uploaderId: 4,
    groupId: 5,
    imageUrl: 'group-5-testImage-1-Url'
  },
  //seeding Venues
  {
    uploaderId: 1,
    venueId: 1,
    imageUrl: 'venue-1-testImage-1-Url'
  },
  {
    uploaderId: 2,
    venueId: 2,
    imageUrl: 'venue-2-testImage-1-Url'
  },
  {
    uploaderId: 4,
    venueId: 2,
    imageUrl: 'venue-2-testImage-2-Url'
  },
  {
    uploaderId: 1,
    venueId: 3,
    imageUrl: 'venue-3-testImage-1-Url'
  },
  {
    uploaderId: 1,
    venueId: 3,
    imageUrl: 'venue-3-testImage-2-Url'
  },
  {
    uploaderId: 1,
    venueId: 3,
    imageUrl: 'venue-3-testImage-3-Url'
  },
  {
    uploaderId: 1,
    venueId: 4,
    imageUrl: 'venue-4-testImage-1-Url'
  },
  {
    uploaderId: 1,
    venueId: 4,
    imageUrl: 'venue-4-testImage-2-Url'
  },
  {
    uploaderId: 1,
    venueId: 4,
    imageUrl: 'venue-4-testImage-3-Url'
  },
  {
    uploaderId: 1,
    venueId: 4,
    imageUrl: 'venue-4-testImage-4-Url'
  },
  {
    uploaderId: 2,
    venueId: 5,
    imageUrl: 'venue-5-testImage-1-Url'
  },
  {
    uploaderId: 5,
    venueId: 5,
    imageUrl: 'venue-5-testImage-2-Url'
  },
  {
    uploaderId: 5,
    venueId: 5,
    imageUrl: 'venue-5-testImage-3-Url'
  },
  {
    uploaderId: 5,
    venueId: 5,
    imageUrl: 'venue-5-testImage-4-Url'
  },
  {
    uploaderId: 1,
    venueId: 5,
    imageUrl: 'venue-5-testImage-5-Url'
  },
  {
    uploaderId: 1,
    venueId: 6,
    imageUrl: 'venue-6-testImage-1-Url'
  },
  {
    uploaderId: 2,
    venueId: 6,
    imageUrl: 'venue-6-testImage-2-Url'
  },
  {
    uploaderId: 1,
    venueId: 6,
    imageUrl: 'venue-6-testImage-3-Url'
  },
  {
    uploaderId: 1,
    venueId: 7,
    imageUrl: 'venue-7-testImage-1-Url'
  },
  {
    uploaderId: 1,
    venueId: 7,
    imageUrl: 'venue-7-testImage-2-Url'
  },
  {
    uploaderId: 2,
    venueId: 8,
    imageUrl: 'venue-8-testImage-1-Url'
  },
  {
    uploaderId: 3,
    venueId: 8,
    imageUrl: 'venue-8-testImage-2-Url'
  },
  {
    uploaderId: 2,
    venueId: 9,
    imageUrl: 'venue-9-testImage-1-Url'
  },
  {
    uploaderId: 2,
    venueId: 9,
    imageUrl: 'venue-9-testImage-2-Url'
  },
  {
    uploaderId: 4,
    venueId: 9,
    imageUrl: 'venue-9-testImage-3-Url'
  },
  {
    uploaderId: 4,
    venueId: 9,
    imageUrl: 'venue-9-testImage-4-Url'
  },
  //seeding events
  {
    uploaderId: 3,
    eventId: 1,
    imageUrl: 'event-1-testImage-1-Url'
  },
  {
    uploaderId: 3,
    eventId: 2,
    imageUrl: 'event-2-testImage-1-Url'
  },
  {
    uploaderId: 3,
    eventId: 2,
    imageUrl: 'event-2-testImage-2-Url'
  },
  {
    uploaderId: 1,
    eventId: 3,
    imageUrl: 'event-3-testImage-1-Url'
  },
  {
    uploaderId: 1,
    eventId: 3,
    imageUrl: 'event-3-testImage-2-Url'
  },
  {
    uploaderId: 1,
    eventId: 3,
    imageUrl: 'event-3-testImage-3-Url'
  },
  {
    uploaderId: 2,
    eventId: 4,
    imageUrl: 'event-4-testImage-1-Url'
  },
  {
    uploaderId: 2,
    eventId: 4,
    imageUrl: 'event-4-testImage-2-Url'
  },
  {
    uploaderId: 2,
    eventId: 4,
    imageUrl: 'event-4-testImage-3-Url'
  },{
    uploaderId: 2,
    eventId: 4,
    imageUrl: 'event-4-testImage-4-Url'
  },
  {
    uploaderId: 3,
    eventId: 5,
    imageUrl: 'event-5-testImage-1-Url'
  },
  {
    uploaderId: 3,
    eventId: 5,
    imageUrl: 'event-5-testImage-2-Url'
  },
  {
    uploaderId: 3,
    eventId: 5,
    imageUrl: 'event-5-testImage-3-Url'
  },
  {
    uploaderId: 3,
    eventId: 5,
    imageUrl: 'event-5-testImage-4-Url'
  },
  {
    uploaderId: 3,
    eventId: 5,
    imageUrl: 'event-5-testImage-5-Url'
  },
  {
    uploaderId: 4,
    eventId: 6,
    imageUrl: 'event-6-testImage-1-Url'
  },
  {
    uploaderId: 6,
    eventId: 6,
    imageUrl: 'event-6-testImage-2-Url'
  },
  {
    uploaderId: 5,
    eventId: 7,
    imageUrl: 'event-7-testImage-1-Url'
  },
  {
    uploaderId: 5,
    eventId: 7,
    imageUrl: 'event-7-testImage-2-Url'
  },
  {
    uploaderId: 5,
    eventId: 7,
    imageUrl: 'event-7-testImage-3-Url'
  },
  {
    uploaderId: 6,
    eventId: 8,
    imageUrl: 'event-8-testImage-1-Url'
  },
  {
    uploaderId: 6,
    eventId: 8,
    imageUrl: 'event-8-testImage-2-Url'
  },
  {
    uploaderId: 4,
    eventId: 9,
    imageUrl: 'event-9-testImage-1-Url'
  },
  {
    uploaderId: 4,
    eventId: 9,
    imageUrl: 'event-9-testImage-2-Url'
  },
  {
    uploaderId: 4,
    eventId: 9,
    imageUrl: 'event-9-testImage-3-Url'
  },
  {
    uploaderId: 4,
    eventId: 9,
    imageUrl: 'event-9-testImage-4-Url'
  },
  {
    uploaderId: 4,
    eventId: 9,
    imageUrl: 'event-9-testImage-5-Url'
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', sampleImages , {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', {} , {})
  }
};
