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
    check('')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage(''),
    handleValidationErrors
];
//----------------------------------------------------------

//Get event details by eventId
router.get(
    '/:eventId',
    async (req, res, next) => {
        const foundEvent = await Event.findOne({
            include: [
                { model: Group, attributes: ['id', 'name', 'private', 'city', 'state'] },
                { model: Venue, attributes: ['id', 'address', 'city', 'state', 'lat', 'lng'] },
                { model: Image, as: 'previewImage', attributes: ['imageUrl'], limit: 10000000 }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: {
                id: req.params.eventId
            },
            order: [['id']]
        });

        if (!foundEvent) {
            const err = new Error("Event couldn't be found");
            err.status = 404;
            return next(err)
        };

        let foundEventwithAttendeeCount = foundEvent.toJSON()

        const attendees = await foundEvent.getAttendees({
            where: {
                status: "Member"
            }
        });

        foundEventwithAttendeeCount.numAttending = attendees.length;

        res.json(foundEventwithAttendeeCount);
    }
);


//Get all events
router.get(
    '/',
    async (_req, res, next) => {
        const foundEvents = await Event.scope('defaultScope').findAll({
            include: [
                { model: Group, attributes: ['id', 'name', 'city', 'state'] },
                { model: Venue, attributes: ['id', 'city', 'state'] },
                { model: Image, as: 'previewImage', attributes: ['imageUrl'], limit: 1 }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'endDate', 'capacity', 'description', 'price']
            },
            order: [['id']]
        })

        const foundEventsWithAttendeeCount = []
        for (let event of foundEvents) {
            let eventWithAttendees = event.toJSON()

            const attendees = await event.getAttendees({
                where: {
                    status: "Member"
                }
            });

            eventWithAttendees.numAttending = attendees.length;

            foundEventsWithAttendeeCount.push(eventWithAttendees);
        }

        res.json({ Events: foundEventsWithAttendeeCount })

    }
);

module.exports = router;
