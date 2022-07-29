'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [
      {
        venueId: 1,
        groupId: 1,
        name: "Adult Hip-Hop Open Level 4 Week Series",
        description: `Adult Hip-Hop Open Level

        Mondays (4 weeks)

        April 12, 19, 26
        May 3

        Time: 8pm-9pm

        Instructor: Adrianna

        Description: This class will help you embrace your own unique personality through music and movement. Spread love, fun, and peace!

        *Please book the dates above in advance for 6 weeks. This is our phase 1 of reopening to ensure students and staff safety. First, come first basis.

        Come inside once class before has cleared.

        Students can join us in three different ways.

        Take in person class at LLDA studio.

        Take virtual class via Zoom Live Streaming.

        Wait a little longer to return to dancing.

        NO REFUNDS. Due to this uncertain time we appreciate your support as we had to make extreme adjustments to provide safety measures for our students.

        CREDIT for boutique or private lessons only.`,
        type: "In Person",
        capacity: 40,
        price: 25.00,
        startDate: new Date("2023-01-20 20:00:00"),
        endDate: new Date("2023-01-02 20:00:00")
      },
      {
        venueId: 3,
        groupId: 1,
        name: "Sample Event --- 2 --- for group --- 1 ---",
        description: "Description for sample event. this will include details of the event happening for group --- 1 ---",
        type: "Online",
        capacity: 10,
        price: 10.00,
        startDate: new Date("2023-02-01 20:00:00"),
        endDate: new Date("2023-02-04 20:00:00")
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Sample Event --- 3 --- for group --- 2 ---",
        description: "Description for sample event. this will include details of the event happening for group --- 2 ---",
        type: "In Person",
        capacity: 30,
        price: 15.00,
        startDate: new Date("2023-01-03 20:00:00"),
        endDate: new Date("2023-01-04 20:00:00")
      },
      {
        venueId: 8,
        groupId: 3,
        name: "Sample Event --- 4 --- for group --- 3 ---",
        description: "Description for sample event. this will include details of the event happening for group --- 3 ---",
        type: "Online",
        capacity: 100,
        price: 5.00,
        startDate: new Date("2023-06-01 20:00:00"),
        endDate: new Date("2023-06-02 20:00:00")
      },
      {
        venueId: 4,
        groupId: 4,
        name: "Sample Event --- 5 --- for group --- 4 ---",
        description: "Description for sample event. this will include details of the event happening for group --- 4 ---",
        type: "In Person",
        capacity: 50,
        price: 100.00,
        startDate: new Date("2023-01-01 20:00:00"),
        endDate: new Date("2023-01-04 20:00:00")
      },
      {
        venueId: 5,
        groupId: 5,
        name: "Sample Event --- 6 --- for group --- 5 ---",
        description: "Description for sample event. this will include details of the event happening for group --- 5 ---",
        type: "In Person",
        capacity: 1000,
        price: 250.00,
        startDate: new Date("2023-03-01 20:00:00"),
        endDate: new Date("2023-03-07 20:00:00")
      },
      {
        venueId: 6,
        groupId: 6,
        name: "Sample Event --- 7 --- for group --- 6 ---",
        description: "Description for sample event. this will include details of the event happening for group --- 6 ---",
        type: "In Person",
        capacity: 3,
        price: 5.00,
        startDate: new Date("2023-04-01 20:00:00"),
        endDate: new Date("2023-04-02 20:00:00")
      },
      {
        venueId: 7,
        groupId: 6,
        name: "Sample Event --- 8 --- for group --- 6 ---",
        description: "Description for sample event. this will include details of the event happening for group --- 6 ---",
        type: "In Person",
        capacity: 40,
        price: 25.00,
        startDate: new Date("2023-09-01 20:00:00"),
        endDate: new Date("2023-09-02 20:00:00")
      },
      {
        venueId: 9,
        groupId: 2,
        name: "Sample Event --- 9 --- for group --- 2 ---",
        description: "Description for sample event. this will include details of the event happening for group --- 2 ---",
        type: "In Person",
        capacity: 15,
        price: 0.00,
        startDate: new Date("2023-01-01 20:00:00"),
        endDate: new Date("2023-01-08 20:00:00")
      },
      {
        venueId: 4,
        groupId: 4,
        name: "Sample Event --- 10 --- for group --- 4 ---",
        description: "Description for sample event. this will include details of the event happening for group --- 4 ---",
        type: "Online",
        capacity: 40,
        price: 7.50,
        startDate: new Date("2023-02-14 20:00:00"),
        endDate: new Date("2023-02-14 20:00:00")
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', {}, {});
  }
};
