'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('Groups', [
      {
        organizerId: 1,
        name: "Test group 1",
        about: "details for test group 1------------------------------------",
        type: "Online",
        private: false,
        city: "Los Angeles",
        state: "CA",
        previewImage: "previewImageURL1"
      },
      {
        organizerId: 2,
        name: "Test group 2",
        about: "details for test group 2------------------------------------",
        type: "Online",
        private: false,
        city: "New York City",
        state: "NY",
        previewImage: "previewImageURL2"
      },
      {
        organizerId: 3,
        name: "Test group 3",
        about: "details for test group 3------------------------------------",
        type: "In Person",
        private: true,
        city: "Atlanta",
        state: "GA",
        previewImage: "previewImageURL3"
      },
      {
        organizerId: 1,
        name: "Test group 4",
        about: "details for test group 4------------------------------------",
        type: "In Person",
        private: true,
        city: "Los Angeles",
        state: "CA",
        previewImage: "previewImageURL4"
      },
      {
        organizerId: 2,
        name: "Test group 5",
        about: "details for test group 5------------------------------------",
        type: "Online",
        private: false,
        city: "Los Angeles",
        state: "CA",
        previewImage: "previewImageURL5"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Groups', {
       name: { [Op.in]: ["Test group 1", "Test group 2", "Test group 3", "Test group 4", "Test group 5"] }
     }, {});
  }
};
