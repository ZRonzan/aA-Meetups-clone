'use strict';

const sampleImages = [
  //seeding groups
  {
    uploaderId: 1,
    groupId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1621976360623-004223992275?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1128&q=80'
  },
  {
    uploaderId: 1,
    groupId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1502519144081-acca18599776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    uploaderId: 3,
    groupId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1546427660-eb346c344ba5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    uploaderId: 3,
    groupId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1601642965967-24ecd614e2fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    uploaderId: 3,
    groupId: 1,
    imageUrl: 'https://images.unsplash.com/photo-1466554934129-f71df54ebb27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    uploaderId: 2,
    groupId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    uploaderId: 2,
    groupId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1502696359287-7e03bbf438bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80'
  },
  {
    uploaderId: 2,
    groupId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1565104552787-dd863a0cf5d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
  },
  {
    uploaderId: 4,
    groupId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1535567952412-219226693102?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    uploaderId: 3,
    groupId: 3,
    imageUrl: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    uploaderId: 2,
    groupId: 3,
    imageUrl: 'https://images.unsplash.com/photo-1610050731821-f58da5e8abc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    uploaderId: 3,
    groupId: 3,
    imageUrl: 'https://images.unsplash.com/photo-1510442650500-93217e634e4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=691&q=80'
  },
  {
    uploaderId: 1,
    groupId: 4,
    imageUrl: 'https://secure.meetupstatic.com/photos/event/c/2/d/clean_470463117.jpeg'
  },
  {
    uploaderId: 1,
    groupId: 4,
    imageUrl: 'https://images.unsplash.com/photo-1620259570543-31964aa22586?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    uploaderId: 4,
    groupId: 5,
    imageUrl: 'https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    uploaderId: 1,
    groupId: 6,
    imageUrl: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1601643157091-ce5c665179ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
  },
  {
    uploaderId: 3,
    eventId: 2,
    imageUrl: 'https://images.unsplash.com/photo-1477336229416-9d67406e73bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    uploaderId: 3,
    eventId: 2,
    imageUrl: 'event-2-testImage-2-Url'
  },
  {
    uploaderId: 1,
    eventId: 3,
    imageUrl: 'https://images.unsplash.com/photo-1575448913281-98e9e5d3f193?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1554080353-321e452ccf19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1602357280104-742c517a1d82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=950&q=80'
  },
  {
    uploaderId: 6,
    eventId: 6,
    imageUrl: 'event-6-testImage-2-Url'
  },
  {
    uploaderId: 5,
    eventId: 7,
    imageUrl: 'https://images.unsplash.com/photo-1558685555-bcdb675f9b9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
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
    imageUrl: 'https://images.unsplash.com/photo-1538388149542-5e24932d11a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    uploaderId: 6,
    eventId: 8,
    imageUrl: 'event-8-testImage-2-Url'
  },
  {
    uploaderId: 4,
    eventId: 9,
    imageUrl: 'https://images.unsplash.com/photo-1566902249079-c97d67671278?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
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
    eventId: 10,
    imageUrl: 'https://images.unsplash.com/photo-1487452066049-a710f7296400?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80'
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
