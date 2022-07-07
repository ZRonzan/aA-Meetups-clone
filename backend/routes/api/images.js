// backend/routes/api/session.js
const express = require('express')

//importing authentication middleware and models from phase 03:
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Group, sequelize, Member, User, Image, Venue, Attendee, Event } = require('../../db/models');
//------------------------------------------------------------------
//---------------importing for phase 05-----------------------------
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//------------------------------------------------------------------
//----------------importing Op query operators----------------------
const { Op } = require('sequelize')
//------------------------------------------------------------------

const router = express.Router();

//middleware to validate body elements when creating/editing an event
const validateEvents = [
    check('venueCheck')
        .exists({ checkFalsy: true })
        .withMessage("Venue does not exist"),
    check('name')
        .isLength({ min: 5 })
        .exists({ checkFalsy: true })
        .withMessage("Name must be at least 5 characters"),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['In Person', 'Online'])
        .withMessage("Type must be Online or In Person"),
    check('capacity')
        .isInt({ min: 1 })
        .withMessage("Capacity must be an integer"),
    check('price')
        .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
        .withMessage("Price is invalid"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('startDate')
        .isAfter()
        .withMessage("Start date must be in the future"),
    check('endDate')
        .custom((value, { req }) => (Date.parse(value) - Date.parse(req.body.startDate)) >= 0)
        .withMessage("End date is less than start date"),
    handleValidationErrors
];
//----------------------------------------------------------

router.delete(
    '/:imageId',
    requireAuth,
    async (req,res,next) => {
        const foundImage = await Image.findByPk(req.params.imageId);
        if(!foundImage) {
            const err = new Error("Image couldn't be found");
            err.status = 404;
            return next(err)
        }

        if(req.user.id === foundImage.uploaderId) {
            await foundImage.destroy();
            res.statusCode = 200
            res.json({
                "message": "Successfully deleted",
                "statusCode": res.statusCode
              })
        } else {
            const err = new Error("Current user is not authorised to delete this image");
            err.status = 403;
            return next(err)
        }
    }
)

module.exports = router;
