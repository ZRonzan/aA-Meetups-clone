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

//Get all Attendees of an Event specified by its id
router.get(
    '/:eventId/attendees',
    async (req,res,next) => {
        const foundEvent = await Event.findByPk(req.params.eventId);
        if (!foundEvent) {
            const err = new Error("Event couldn't be found");
            err.status = 404;
            return next(err)
        };

        const foundGroup = await Group.findByPk(foundEvent.groupId)
        if (!foundGroup) {
            const err = new Error("Group couldn't be found");
            err.status = 404;
            return next(err);
        };

        const foundCoHost = await Member.findOne({
            where: {
                groupId: foundEvent.groupId,
                memberId: req.user.id,
                status: "Co-Host"
            }
        })

        if (foundGroup.organizerId === req.user.id || foundCoHost) {
            const foundMembersWithPending = await User.findAll({
                include: [
                    {
                        model: Attendee,
                        as: 'Attendance',
                        attributes: ['status'],
                        where: {
                            eventId: req.params.eventId
                        }
                    }
                ],
                attributes: ['id', 'firstName', 'lastName']
            })
            res.json({Attendees: foundMembersWithPending});
        } else {
            const foundMembersWithoutPending = await User.findAll({
                include: [
                    {
                        model: Attendee,
                        as: 'Attendance',
                        attributes: ['status'],
                        where: {
                            status: {
                                [Op.not]: 'Pending'
                            },
                            eventId: req.params.eventId
                        }
                    }
                ],
                attributes: ['id', 'firstName', 'lastName']
            })
            res.json({Attendees: foundMembersWithoutPending});
        }

    }
)

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

//Edit an Event specified by its id
router.put(
    '/:eventId',
    requireAuth,
    async (req, res, next) => {
        if (req.body.venueId) {
            const foundVenue = await Venue.findByPk(req.body.venueId);
            if (!foundVenue) {
                let err = new Error("Venue couldn't be found")
                err.status = 404
                return next(err);
            } else {
                req.body.venueCheck = true;
                next();
            }
        } else {
            next();
        }
    },
    validateEvents,
    async (req, res, next) => {

        const foundEvent = await Event.findByPk(req.params.eventId)
        if (!foundEvent) {
            const err = new Error("Event couldn't be found");
            err.status = 404;
            return next(err);
        };

        const foundGroup = await Group.findByPk(foundEvent.groupId)
        if (!foundGroup) {
            const err = new Error("Group couldn't be found");
            err.status = 404;
            return next(err);
        };

        const foundCoHost = await Member.findOne({
            where: {
                groupId: foundEvent.groupId,
                memberId: req.user.id,
                status: "Co-Host"
            }
        })

        if (foundGroup.organizerId !== req.user.id && !foundCoHost) {
            const err = new Error("Current user is not the owner or the Co-Host of the group");
            err.status = 403;
            return next(err);
        } else if (foundGroup.organizerId === req.user.id || foundCoHost) {
            const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body

                foundEvent.venueId= venueId
                foundEvent.name= name
                foundEvent.type= type
                foundEvent.capacity= capacity
                foundEvent.price= price
                foundEvent.description= description
                foundEvent.startDate= startDate
                foundEvent.endDate= endDate

                await foundEvent.save()

            const updatedEventResponse = {
                id: foundEvent.id,
                groupId: foundEvent.id,
                venueId: foundEvent.venueId,
                name: foundEvent.name,
                type: foundEvent.type,
                capacity: foundEvent.capacity,
                price: foundEvent.price,
                description: foundEvent.description,
                startDate: foundEvent.startDate,
                endDate: foundEvent.endDate
            };
            res.json(updatedEventResponse);
        } else {
            const err = new Error("Could not update event");
            err.status = 400;
            return next(err);
        }

    }

)

router.delete(
    "/:eventId",
    requireAuth,
    async (req, res, next) => {
        const foundEvent = await Event.findByPk(req.params.eventId)

        if (!foundEvent) {
            const err = new Error("Event couldn't be found");
            err.status = 404;
            return next(err);
        }

        const foundGroup = await Group.findByPk(foundEvent.groupId);

        const foundCoHost = await Member.findOne({
            where: {
                groupId: foundGroup.id,
                memberId: req.user.id,
                status: 'Co-Host'
            }
        })

        if (foundGroup.organizerId === req.user.id || foundCoHost) {
            await foundEvent.destroy();
            res.json({
                "message": "Successfully deleted"
            })
        } else {
            const err = new Error("Current user must be the organizer of the group or a Co-Host to delete events")
            err.status = 403;
            return next(err)
        }

    }
)

module.exports = router;
