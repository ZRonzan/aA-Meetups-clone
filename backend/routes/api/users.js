const express = require('express')
//------------------------------------importing from phase 03
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
//------------------------------------------------------------
//----------------------importing from phase 05 for validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//---------------------------------------------------------------
const router = express.Router();

//validation of user creation signup------------------------
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];
//--------------------------------------------------------

// Sign up
router.post(
    '/',
    validateSignup, //added in phase 5 to validate signup inputs
    async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    }
);

module.exports = router;
