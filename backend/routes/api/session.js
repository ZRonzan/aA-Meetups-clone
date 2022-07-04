// backend/routes/api/session.js
const express = require('express')

//importing authentication middleware and User model from phase 03:
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Group, UserGroup, sequelize} = require('../../db/models');
//------------------------------------------------------------------
//---------------importing for phase 05-----------------------------
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//------------------------------------------------------------------

const router = express.Router();

//middleware for phase 05 to validate keys from the req.body
const validateLogin = [
    check('email')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required'),
    handleValidationErrors
];
//----------------------------------------------------------

// Log in using username/email and the password
router.post(
    '/login',
    validateLogin,
    async (req, res, next) => {
        const { email, password } = req.body;

        //runs model method to login
        const user = await User.login({ email, password });

        //if credentials are incorrect: give an error
        if (!user) {
            const err = new Error('Invalid Credentials');
            err.status = 401;
            err.title = 'Login failed';
            // err.errors = ['The provided credentials were invalid.']; // commented out to match the api documentation
            return next(err);
        }

        //set the cookie upon successful login
        let token = await setTokenCookie(res, user);

        //return the user that just logged in
        return res.json({
            user, token
        });
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

//Get all groups joined or organized by the current User
router.get('/groups', restoreUser ,async (req, res) => {


    const foundOwnedGroups = await Group.findAll({
        include: {
            model: UserGroup,
            attributes: []
        },
        where: {
            organizerId: req.user.id
        },
        attributes: {
            include: [[sequelize.fn("COUNT", sequelize.col("UserGroups.groupId")),"numMembers"]],
        },
        group: ['UserGroups.groupId']
    });


    const foundGroupsAsMember = await UserGroup.findAll({
        attributes: [],
        include: {
            model: Group,
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("groupId")),"numMembers"]],
            },
            group: ['groupId']
        },
        where: {
            memberId: req.user.id
        }
    });

    let allGroups =[...foundOwnedGroups, ...foundGroupsAsMember]

    res.json({Groups: allGroups})
})

// Restore session user
router.get(
    '/',
    restoreUser, //run the restore middleware to check is a user is already logged in, then moves to the next middleware
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);





module.exports = router;
