'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Venues', [
      {
        groupId: 1,
        address: "1234 Test avenue venue 1",
        city: "Los Angeles",
        state: "CA",
        lat: 34.052235,
        lng: -118.243683
      },
      {
        groupId: 2,
        address: "1234 Test avenue venue 2",
        city: "New York",
        state: "NY",
        lat: 40.748817,
        lng: -73.985428
      },
      {
        groupId: 1,
        address: "1234 Test avenue venue 3",
        city: "Los Angeles",
        state: "CA",
        lat: 34.088570,
        lng: -118.451790
      },
      {
        groupId: 4,
        address: "1234 Test avenue venue 4",
        city: "Atlanta",
        state: "GA",
        lat: 33.753746,
        lng: -84.386330
      },
      {
        groupId: 5,
        address: "1234 Test avenue venue 5",
        city: "New York",
        state: "CA",
        lat: 40.753181,
        lng: -73.982254
      },
      {
        groupId: 6,
        address: "1234 Test avenue venue 6",
        city: "Honolulu",
        state: "HI",
        lat: 21.315603,
        lng: -157.858093
      },
      {
        groupId: 6,
        address: "1234 Test avenue venue 7",
        city: "Los Angeles",
        state: "CA",
        lat: 34.205921,
        lng: -118.575409
      },
      {
        groupId: 3,
        address: "1234 Test avenue venue 8",
        city: "Seattle",
        state: "WA",
        lat: 47.443546,
        lng: -122.301659
      },
      {
        groupId: 2,
        address: "1234 Test avenue venue 9",
        city: "San Francisco",
        state: "CA",
        lat: 	37.809326,
        lng: -122.409981
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Venues', {}, {});
  }
};
