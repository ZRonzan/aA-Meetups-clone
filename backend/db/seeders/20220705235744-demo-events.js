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
        name: "Learning your backflips",
        description: "Join us as we learn and practice our backflips in the comfort and safety of your own rooms! we will go from the absolute basics, through to the safest ways to dismount and recover from any unwanted falls. You can do this!",
        type: "Online",
        capacity: 10,
        price: 10.00,
        startDate: new Date("2023-02-01 20:00:00"),
        endDate: new Date("2023-02-04 20:00:00")
      },
      {
        venueId: 2,
        groupId: 2,
        name: "Salsa evening - Open invites",
        description: "We will be hosting an all members salsa event where we demonstrate everythign that we have learned to date. Doesn't matter how rusty you may feel, this is a chance to celebrate YOU, and for you to show off what you got! All ages, all experience levels, it doesn't matter. We're here to celebrate Salsa, and the vibes will be great!",
        type: "In Person",
        capacity: 30,
        price: 15.00,
        startDate: new Date("2023-01-03 20:00:00"),
        endDate: new Date("2023-01-04 20:00:00")
      },
      {
        venueId: 8,
        groupId: 3,
        name: "Writing prompts - Poetry",
        description: "We have online classes where we go over writing prompts and spend some time creating poetry based off of the prompts. No holds barred. topics can come from anywhere as long as they come from the heart and inspire you to light your pages aflame with ambition and prose!",
        type: "Online",
        capacity: 100,
        price: 5.00,
        startDate: new Date("2023-06-01 20:00:00"),
        endDate: new Date("2023-06-02 20:00:00")
      },
      {
        venueId: 4,
        groupId: 4,
        name: "People of NYC photography expedition",
        description: "Let's spend some time to really show the world the exxence of what makes NYC so great. Its people. People from all races, backgrounds, places, life stories. Let's hear them all. Take the time to sit down and ask questions as this is more than just taking a photo. It's an opportunity to reconnect with each other, learn and observe. So get out there, get some amazing phots and don't forget to ASK FOR PERMISSION. ",
        type: "In Person",
        capacity: 50,
        price: 100.00,
        startDate: new Date("2023-01-01 20:00:00"),
        endDate: new Date("2023-01-04 20:00:00")
      },
      {
        venueId: 5,
        groupId: 5,
        name: "3x3 Women's Basketball League - ALL IN",
        description: `3x3 League
        Max 4 people on a team
        Ref/stat fees and refundable deposit fees are not included in registration
        Boys & Girls Club of Westminster`,
        type: "In Person",
        capacity: 1000,
        price: 250.00,
        startDate: new Date("2023-03-01 20:00:00"),
        endDate: new Date("2023-03-07 20:00:00")
      },
      {
        venueId: 6,
        groupId: 6,
        name: "Let's Virtual Art!",
        description: `This meetup will be held on Discord.

        All levels of Doodlebug welcome, from those of us who just picked up an adult colouring book for the first time to those with years of experience. We all have talents, so let's gather and do some art in a safe and relaxing atmosphere.

        We are a very flexible group, so please arrive at the time that works for you. You can join as early as 6PM and stay as late as 9PM Mountain Time.

        This is a non-instructional meeting. Feel free to work on any projects that you'd like to work on for the evening whether that means your sketchbook, computer, tablet, colouring book, or canvas and paints.

        We have the pleasure of being sponsored by Colours Art & Framing 3 blocks south of Whyte Ave. We encourage you to go check out the store for any of your art supply needs, and don't forget to tell them you're a part of the Doodlebugs to get your discount!`,
        type: "In Person",
        capacity: 3,
        price: 5.00,
        startDate: new Date("2023-04-01 20:00:00"),
        endDate: new Date("2023-04-02 20:00:00")
      },
      {
        venueId: 7,
        groupId: 6,
        name: "ONLINE Art Share!",
        description: `Join us for our ONLINE art share for the October CRP: "Cryptoid"

        We would love to see what you have created for release!

        Email (only) your art image(s) directly to LetsDoArt@gmail.com - SUBJECT LINE: "ART SHARE"

        ***

        RSVP'd "YES" participants will receive direct Zoom link and password upon registering.

        Please keep your art shares to any art you are planning to release inspired by past themes, or this month's "CRYPTID."

        **IMPORTANT: We utilize our share screen to show your artwork so everyone can see it easily. To accommodate this, PLEASE EMAIL me photos of the art you wish to share that you plan on releasing, exchanging, or gifting in the spirit of Creative Release :)

        LetsDoArt@gmail.com - SUBJECT LINE: "ART SHARE"

        Looking forward to seeing you online!`,
        type: "In Person",
        capacity: 40,
        price: 25.00,
        startDate: new Date("2023-09-01 20:00:00"),
        endDate: new Date("2023-09-02 20:00:00")
      },
      {
        venueId: 9,
        groupId: 2,
        name: "Spicy Salsa for Adults!",
        description: `Whether you are a total beginner or with somewhat dance experience, you will enjoy the vibes and energy exchanged in this place! Each class is a new routine so everyone starts on the same page. Make sure to NOT be late as to NOT miss any instruction. Routines are designed for male and/or female attendees and must be at least 18 years of age. Bring your own water or help yourself to ours, dress in active wear and tennis shoes and don't feel intimidated! We are here to assist you and share our dancing passion and not to judge. Many people has found this place to be their 2nd home and weekly booster for meeting great people and getting their grove on without needing a partner or dancing experience. This is a great substitute for whenever you do not feel like going to the gym and yet need to burn some calories! Come check it out and let us know how to better assist you upon arrival. You can get a break on the entry fee by pre-checking on line. Will see you soon!`,
        type: "In Person",
        capacity: 15,
        price: 0.00,
        startDate: new Date("2023-01-01 20:00:00"),
        endDate: new Date("2023-01-08 20:00:00")
      },
      {
        venueId: 4,
        groupId: 4,
        name: "Introduction To Street Photography For Beginners",
        description: `Details
        WELCOME TO OUR PHOTOGRAPHY COMMUNITY
        Learn How To Create Amazing Photos That Demand Attention!
        We Are a Community of Photographers Looking to Master Our Skills.

        --> DSLRs, Mirrorless, Smartphones - All Experience & Cameras Welcome!

        WHY WE DO THIS
        Artists who learn together and inspire each other are more likely to reach their potential.

        Unleash Your Inner Photographer
        Be Confident That What You’re Doing Is Right
        Join A Trusted Positive Group

        HOW IT WORKS
        LIVE Online Photography Meetups, Discussions & Lessons
        Hosted EVERY DAY - LIVE On Zoom

        TODAY'S TOPIC
        An Introduction To Street Photography For Beginners
        PLUS Seven Situations When To Take A Photograph!

        INCLUDED IN TODAYS LIVE ZOOM

        A full one-hour photography course
        All The Course Notes
        A Video Replay (Optional)
        A List Of All The Photographers/Images
        All The Links We Cover
        Instruction By A Professional Teacher
        WE WILL COVER

        What Is Street Photography?
        Why Is Street Photography Important?
        How To Take Street Photos

        25 Techniques & Tips Including:
        Locations
        Techniques And Tips
        Practicing
        Choosing Gear
        Camera Settings
        Photos Of People
        Photos Of People’s Creations
        Building Habits
        Paralysis By Analysis
        Working On Social Skills
        Being Happy With What You're Up To!

        PLUS - Seven Situations When To Take A Photograph`,
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
