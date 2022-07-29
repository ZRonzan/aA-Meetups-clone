'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('Groups', [
      {
        organizerId: 1,
        name: "Orange Hip Hop Meetup Group",
        about: "These classes are recommended to anyone who wants to learn how to coordinate and synchronize dancing moves with music while having fun at a very friendly environment designed to welcome beginners into the dancing world!",
        type: "In Person",
        private: false,
        city: "Orange",
        state: "CA"
      },
      {
        organizerId: 2,
        name: "Westside Culver City Salsa, Bachata, Tango, Hip-Hop, Zouk",
        about: "This is a group for anyone interested learning Salsa & Bachata dancing. This is for Beginner and Intermediate level. No experience necessary. No need to bring a partner. However, invite friends to join the group! More people= More fun!! I started this group because to meet other enthusiasts. Looking forward to dancing with you!",
        type: "In Person",
        private: false,
        city: "Santa Monica",
        state: "CA"
      },
      {
        organizerId: 3,
        name: "Third Street Writers",
        about: "We are a non-profit group and our mission is to support writers in Laguna Beach and beyond. To this end, we have weekly writing workshops. The workshops are currently hybrid using ZOOM and in-person at the Laguna Beach Community and Susi Q Center (380 Third Street) on Monday from 12:00-2:00 p.m. We also host Open Mic and Reading events throughout the year and publish Beach Reads. All are welcome. Join us!",
        type: "In Person",
        private: true,
        city: "Laguna Beach",
        state: "CA"
      },
      {
        organizerId: 1,
        name: "New York Street Photography",
        about: "It has been great pleasure and honor to share and meet talented friends who share same passion and love for street photography. Every meeting is an opportunity and learning experience to share joy and delight. Street photography helps to create beautiful images on street for day to day life with attention to details . Capture the emotional and gesture of people of different culture. New York Street Photographers aim to promote street photography and cultural engagement through practice and discussion. This group is all about engaging intimately with the world around you in an attempt to capture the unfamiliar in the familiar, to find the unseen in the mundane. It's about getting out onto the streets with equally passionate people and creating an invaluable social network, to improve your photography skills, without possibly feeling awkward or intimidated by the environment/ subjects. If you like the sound of street photography then join up, it's going to be rewarding, and best of all, fun walking the streets of New York with camera in hand, and enjoying a nice coffee after an event to ask those question you have always wanted to ask a fellow photographer.",
        type: "In Person",
        private: true,
        city: "New York",
        state: "NY"
      },
      {
        organizerId: 2,
        name: "NYC Pick-Up Basketball - Manhattan, Brooklyn & Queens",
        about: `Live in Williamsburg or Geenpoint or Bushwick and want to play some B-ball?
        Want to:
        - Play for fun
        - socialize
        - meet new people.

        We will be running leagues at The Post BK just steps from McCarren Park`,
        type: "Online",
        private: false,
        city: "Brooklyn",
        state: "NY"
      },
      {
        organizerId: 1,
        name: "The Virtual Art Collective",
        about: `The Virtual Art Collective is a community of 3D artist, technologist, storytellers and traditional artist interested in transitioning into virtual reality as an artistic medium. This is a platform for contemporary artist and technologist who are looking to fearlessly pave the way for a new art-form. This group will offer a physical and virtual space to create and showcase work. Through this tight knit group of artist, we will collaborate, workshop and inspire one another to grow and evolve. While using VR creation tools and experimental processes, we will explore the boundless potential of creating worlds with virtual paint strokes, craft holographic sculptures and become authors of mixed realities. Ultimately redefining what it means to be an artist in the 21st century.`,
        type: "Online",
        private: false,
        city: "San Francisco",
        state: "Ca"
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
