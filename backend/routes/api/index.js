const router = require('express').Router();
//importing routes from phase 04:
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const eventsRouter = require('./events.js');
//importing restore code from phase 3:
const { restoreUser } = require("../../utils/auth.js");

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });

//------------------code for testing phase 03 authentication
// const { setTokenCookie } = require('../../utils/auth.js'); //import setting token function
// const { User } = require('../../db/models'); //import user model

// router.get('/set-token-cookie', async (_req, res) => {
//     //get user model
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     //set a cookie for the user
//     setTokenCookie(res, user);
//     //return the user
//     return res.json({ user });
// });

// GET /api/restore-user
//const { restoreUser } = require('../../utils/auth.js'); //added to the top of this file on line 6

router.use(restoreUser); // DO NOT COMMENT OUT. before any other middleware or route handlers are connected to the router

// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// });

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

//-----------------------end tests for phase 03 authentication
//-----------------------phase 04 user auth routes

router.use('/session', sessionRouter); //DO NOT COMMENT OUT

router.use('/users', usersRouter); //DO NOT COMMENT OUT

router.use('/groups', groupsRouter) //DO NOT COMMENT OUT

router.use('/events', eventsRouter) //DO NOT COMMENT OUT

// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

//-------------------------end phase 04 testing

module.exports = router;
