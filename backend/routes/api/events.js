// backend/routes/api/session.js
const express = require('express')

//importing authentication middleware and models from phase 03:
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Group, sequelize, Member, User, Image, Venue, Attendee, Event } = require('../../db/models');
//------------------------------------------------------------------
//---------------importing for phase 05-----------------------------
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//------------------------------------------------------------------
//----------------importing Op query operators----------------------
const { Op } = require('sequelize')
//------------------------------------------------------------------

const router = express.Router();

//middleware to validate body elements when creating/editing an event
const validateEvents = [
    check('venueId')
        .custom(async (val) => {
            if (val) {
                const foundVenue = await Venue.findByPk(val);
                if (!foundVenue) {
                    return false;
                } else {
                    return true
                }
            } else {
                return true;
            }
        })
        .withMessage("Venue does not exist"),
    check('name')
        .isLength({ min: 5 })
        .withMessage("Name must be at least 5 characters"),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['In Person', 'Online'])
        .withMessage("Type must be Online or In Person"),
    check('capacity')
        .isInt({ min: 1 })
        .withMessage("Capacity must be an integer greater than 0"),
    check('capacity')
        .isInt({ max: 1000000000 })
        .withMessage("Provided capacity is too high. Why would you even have an event that hosts this many people?"),
    check('price')
        .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
        .withMessage("Price is invalid"),
    check('price')
        .custom((val) => val <= 1000000000)
        .withMessage("Price is too high. who is even going to attend this? Jeff Bezos?"),
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

const validateQueries = [
    query('page')
        .optional()
        .isInt({ min: 0 })
        .withMessage("Page must be greater than or equal to 0"),
    query('size')
        .optional()
        .isInt({ min: 0 })
        .withMessage("Size must be greater than or equal to 0"),
    query('name')
        .optional()
        .isString()
        .withMessage("Name must be a string"),
    query('type')
        .optional()
        .isIn(['Online', 'In Person'])
        .withMessage("Type must be 'Online' or 'In Person'"),
    query('startDate')
        .optional()
        .isAfter()
        .custom((value, { req }) => !isNaN(Date.parse(value)))
        .toDate()
        .withMessage("Start date must be a valid datetime"),
    handleValidationErrors
];
//----------------------------------------------------------

//Get all Attendees of an Event specified by its id
router.get(
    '/:eventId/attendees',
    async (req, res, next) => {
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

        let foundCoHost;

        if (req.user) {
            foundCoHost = await Member.findOne({
                where: {
                    groupId: foundEvent.groupId,
                    memberId: req.user.id,
                    status: "Co-Host"
                }
            })

        }

        if (req.user && (foundGroup.organizerId === req.user.id || foundCoHost)) {
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
            res.json({ Attendees: foundMembersWithPending });
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
            res.json({ Attendees: foundMembersWithoutPending });
        }

    }
)

//Get current user status of event/group
router.get(
    '/:eventId/status',
    requireAuth,
    async (req, res, next) => {

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

        const foundStatus = await Attendee.findOne({
            where: {
                eventId: req.params.eventId,
                userId: req.user.id
            }
        })


        let eventStatus;

        if (foundGroup.organizerId === req.user.id) {
            eventStatus = {
                "currentEventStatus": "Organizer"
            }
        } else if (foundStatus) {
            eventStatus = {
                "currentEventStatus": foundStatus.status
            }
        } else {
            eventStatus = {
                "currentEventStatus": "None"
            }
        }

        res.json(eventStatus)
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
                { model: Image, as: 'previewImage', attributes: ['imageUrl'] }
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
    validateQueries,
    async (req, res, next) => {
        let { page, size, name, type, startDate } = req.query;

        if (page) {
            if (page < 0) page = 0
            else if (page > 10) page = 10
            else page = Number(page)
        } else {
            page = 0
        }
        if (size) {
            if (size < 0) size = 20
            else if (size > 20) size = 20
            else size = Number(size)
        } else {
            size = 20
        }

        const pagination = {
            limit: size,
            offset: size * page
        };

        const queries = {
            where: {
                //queries go here if they exist
            }
        }

        if (startDate) {
            if (!isNaN(Date.parse(startDate))) queries.where.startDate = startDate;
        }
        if (name) queries.where.name = { [Op.substring]: name };
        if (type) queries.where.type = type;



        const foundEvents = await Event.findAll({
            include: [
                { model: Group, attributes: ['id', 'name', 'city', 'state'] },
                { model: Venue, attributes: ['id', 'city', 'state'] },
                { model: Image, as: 'previewImage', attributes: ['imageUrl'], limit: 1 }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'endDate', 'capacity', 'description', 'price']
            },
            ...queries,
            ...pagination,
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

        res.json({ Events: foundEventsWithAttendeeCount, page: page, size: pagination.limit })

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

            foundEvent.venueId = venueId
            foundEvent.name = name
            foundEvent.type = type
            foundEvent.capacity = capacity
            foundEvent.price = price
            foundEvent.description = description
            foundEvent.startDate = new Date(startDate)
            foundEvent.endDate = new Date(endDate)

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

);

//Add an Image to a Group based on the Group's id
router.post(
    '/:eventId/images',
    requireAuth,
    async (req, res, next) => {

        const foundEvent = await Event.findByPk(req.params.eventId)
        if (!foundEvent) {
            let err = new Error("Event couldn't be found")
            err.status = 404
            return next(err);
        }

        const foundGroup = await Group.findByPk(foundEvent.groupId)
        if (!foundGroup) {
            const err = new Error("Group couldn't be found for this event");
            err.status = 404;
            return next(err);
        };

        const foundAttendee = await Attendee.findOne({
            where: {
                userId: req.user.id,
                eventId: foundEvent.id,
                status: 'Member'
            }
        });

        if (!foundAttendee && foundGroup.organizerId !== req.user.id) {
            let err = new Error("Current user is not attending this event and is not the owner of the group associated with this event. Current user is unauthorized to upload an image")
            err.status = 403
            return next(err);
        }

        if (foundAttendee || foundGroup.organizerId === req.user.id) {
            const newImage = await Image.create({
                uploaderId: req.user.id,
                eventId: foundEvent.id,
                imageUrl: req.body.url
            });

            res.json({
                id: newImage.id,
                imageableId: newImage.eventId,
                imageableType: 'Event',
                imageUrl: newImage.imageUrl
            });
        }
    }
)

//Request to Attend an Event based on the Event's id
router.post(
    '/:eventId/join',
    requireAuth,
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


        const foundMembership = await Member.findOne({
            where: {
                groupId: foundGroup.id,
                memberId: req.user.id,
                status: {
                    [Op.not]: 'Pending'
                }
            }
        });

        const checkAttendance = await Attendee.findOne({
            where: {
                eventId: req.params.eventId,
                userId: req.user.id,
            }
        });

        if (checkAttendance && (checkAttendance.status === 'Pending' || checkAttendance.status === 'Waitlist')) {
            const err = new Error("Attendance has already been requested")
            err.status = 400;
            return next(err);
        } else if (checkAttendance && checkAttendance.status === 'Member') {
            const err = new Error("User is already an attendee of the event")
            err.status = 400;
            return next(err);
        };

        if (foundGroup.organizerId === req.user.id || foundMembership) {
            await Attendee.create(
                {
                    eventId: req.params.eventId,
                    userId: req.user.id,
                    status: 'Pending'
                }
            );

            res.json({
                eventId: req.params.eventId,
                userId: req.user.id,
                status: 'Pending'
            });
        } else {
            const err = new Error("Current user cannot apply for attendance to the specified event. Please confirm group membership")
            err.status = 400;
            return next(err);
        }
    }
);

//Change the status of an attendance for an event specified by id
router.put(
    '/:eventId/attendees',
    requireAuth,
    async (req, res, next) => {
        if (req.body.status === 'Pending') {
            const err = new Error("Cannot change an attendance status to Pending");
            err.status = 400;
            return next(err);
        }

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
                groupId: foundGroup.id,
                memberId: req.user.id,
                status: 'Co-Host'
            }
        });

        const foundAttendee = await Attendee.findOne({
            where: {
                eventId: req.params.eventId,
                userId: req.body.userId,
            }
        });
        if (!foundAttendee) {
            const err = new Error("Attendance between the user and the event does not exist");
            err.status = 404;
            return next(err);
        };

        if (foundGroup.organizerId === req.user.id || foundCoHost) {

            if (foundAttendee.status === 'Pending' || foundAttendee.status === 'Waitlist') {
                foundAttendee.status = req.body.status
                foundAttendee.save();

                returnObj = {
                    id: foundAttendee.id,
                    eventId: foundAttendee.eventId,
                    userId: foundAttendee.userId,
                    status: foundAttendee.status,
                }
                return res.json(returnObj);

            } else {
                const err = new Error("Member is already an attendee of this event")
                err.status = 400;
                return next(err)
            }

        } else {
            const err = new Error("Current user cannot update status for this member and/or event. Please confirm group Organizer of Co-Host status")
            err.status = 403;
            return next(err);
        }
    }
);

//Delete attendance to an event specified by id
router.delete(
    '/:eventId/attendees',
    requireAuth,
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


        const foundMember = await Member.findOne({
            where: {
                groupId: foundGroup.id,
                memberId: req.user.id
            }
        });

        const foundAttendee = await Attendee.findOne({
            where: {
                eventId: req.params.eventId,
                userId: req.body.userId,
            }
        });
        if (!foundAttendee) {
            const err = new Error("Attendance does not exist for this User");
            err.status = 404;
            return next(err);
        };

        if (foundGroup.organizerId === req.user.id) {
            await foundAttendee.destroy();

            res.json({
                "message": "Successfully deleted attendance from event"
            })

        } else if (foundMember && req.body.userId === req.user.id) {
            await foundAttendee.destroy();

            res.json({
                "message": "Successfully deleted attendance from event"
            })
        } else {
            const err = new Error("Only the User or organizer may delete an Attendance")
            err.status = 403;
            return next(err);
        }
    }
);


//delete an event specified by event id
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
