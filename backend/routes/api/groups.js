// backend/routes/api/session.js
const express = require('express')

//importing authentication middleware and User model from phase 03:
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Group } = require('../../db/models');
//------------------------------------------------------------------
//---------------importing for phase 05-----------------------------
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//------------------------------------------------------------------

const router = express.Router();

//middleware for phase 05 to validate keys from the req.body
const validateGroups = [
    check('')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage(''),
    check('')
        .exists({ checkFalsy: true })
        .withMessage(''),
    handleValidationErrors
];
//----------------------------------------------------------



// Restore session user
router.get(
    '/',
    async (_req,res) => {
        const foundGroups = await Group.findAll()

        res.json(foundGroups);
    }
);

module.exports = router;
