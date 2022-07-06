// backend/routes/api/session.js
const express = require('express')

//importing authentication middleware and models from phase 03:
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Group, sequelize, Member, User, Image, Event, Venue } = require('../../db/models');
//------------------------------------------------------------------
//---------------importing for phase 05-----------------------------
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//------------------------------------------------------------------
//----------------importing Op query operators----------------------
const { Op } = require('sequelize')
//------------------------------------------------------------------

const router = express.Router();

//middleware for phase 05 to validate keys from the req.body
const validateVenues = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('lat')
        .isDecimal({ min: -90, max: 90 })
        .withMessage("Latitude is not valid"),
    check('lng')
        .isDecimal({ min: -180, max: 180 })
        .withMessage("Longitude is not valid"),
    handleValidationErrors
];
//----------------------------------------------------------

//Edit a Venue specified by its id
router.put(
    '/:venueId',
    requireAuth,
    validateVenues,
    async (req, res, next) => {


        const foundVenue = await Venue.findByPk(req.params.venueId,
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        );

        if (!foundVenue) {
            let err = new Error("Venue couldn't be found")
            err.status = 404
            return next(err)
        };

        console.log(foundVenue.groupId)

        const foundGroup = await Group.findByPk(foundVenue.groupId)

        if (!foundGroup) {
            let err = new Error("Group couldn't be found")
            err.status = 404
            return next(err)
        };

        const foundCoHost = await Member.findOne({
            where: {
                groupId: foundVenue.groupId,
                memberId: req.user.id,
                status: "Co-Host"
            }
        })

        if (foundGroup.organizerId !== req.user.id && !foundCoHost) {
            const err = new Error("Current user is not the owner or the Co-Host of the group");
            err.status = 403;
            return next(err);
        } else if (foundGroup.organizerId === req.user.id || foundCoHost) {
            const { address, city, state, lat, lng } = req.body

            foundVenue.address = address;
            foundVenue.city = city;
            foundVenue.state = state;
            foundVenue.lat = lat;
            foundVenue.lng = lng;

            foundVenue.save();

            res.json(foundVenue)
        } else {
            const err = new Error("Could not edit venue");
            err.status = 400;
            return next(err);
        }

    }
)


module.exports = router;
