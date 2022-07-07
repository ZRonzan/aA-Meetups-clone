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
const validateGroups = [
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['Online', 'In Person'])
        .withMessage('Type must be Online or In Person'),
    check('private')
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    handleValidationErrors
];

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

//Get group details and number of members from group id
router.get(
    '/:groupId/members',
    async (req, res, next) => {

        const foundGroup = await Group.findByPk(req.params.groupId);

        if (!foundGroup) {
            let err = new Error("Group couldn't be found")
            err.status = 404
            return next(err)
        };

        let foundMembers;

        if (req.user && req.user.id && req.user.id === foundGroup.organizerId) {
            foundMembers = await User.findAll({
                include: {
                    model: Member,
                    attributes: ['status'],
                    where: {
                        groupId: req.params.groupId
                    }
                }
            });
        } else {
            foundMembers = await User.findAll({
                include: {
                    model: Member,
                    attributes: ['status'],
                    where: {
                        groupId: req.params.groupId,
                        status: { [Op.not]: 'Pending' }
                    }
                }
            });
        }

        res.json(foundMembers)
    }
);

//Get all events of a group specified by its id
router.get(
    '/:groupId/events',
    async (req, res, next) => {

        const foundGroup = await Group.findByPk(req.params.groupId);

        if (!foundGroup) {
            const err = new Error("Group couldn't be found");
            err.status = 404;
            return next(err);
        }

        const foundEvents = await Event.findAll({
            include: [
                {
                    model: Group,
                    where: {
                        id: req.params.groupId
                    },
                    attributes: ['id', 'name', 'city', 'state']
                },
                {
                    model: Venue,
                    attributes: ['id', 'city', 'state']
                },
                {
                    model: Image,
                    as: "previewImage",
                    attributes: ['imageUrl'],
                    limit: 1
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'endDate', 'capacity', 'description', 'price']
            },
            order: [['id']]
        });


        const updatedfoundEvents = []
        for (let event of foundEvents) {
            newEvent = event.toJSON()
            newEvent.numAttending = await event.countAttendees({
                where: {
                    status: {
                        [Op.is]: 'Member'
                    }
                }
            })
            updatedfoundEvents.push(newEvent)
        }

        res.json(updatedfoundEvents)
    }
);

//Add an Image to a Group based on the Group's id
router.post(
    '/:groupId/images',
    requireAuth,
    async (req, res, next) => {
        const foundGroup = await Group.findByPk(req.params.groupId);
        if (!foundGroup) {
            let err = new Error("Group couldn't be found")
            err.status = 404
            return next(err);
        }

        if (foundGroup.organizerId === req.user.id) {
            const newImage = await Image.create({
                uploaderId: req.user.id,
                groupId: foundGroup.id,
                imageUrl: req.body.url
            });

            res.json({
                id: newImage.id,
                groupId: newImage.groupId,
                imageUrl: newImage.imageUrl
            });
        } else {
            let err = new Error("Current user must be the group organizer in order to upload images to this group")
            err.status = 403
            return next(err);
        }
    }
)

//create a new event for a group specified by its Id
router.post(
    '/:groupId/events',
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
        const foundGroup = await Group.findByPk(req.params.groupId);

        if (!foundGroup) {
            const err = new Error("Group couldn't be found");
            err.status = 404;
            return next(err);
        }

        const foundCoHost = await Member.findOne({
            where: {
                groupId: req.params.groupId,
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

            const newEvent = await Event.create({
                groupId: foundGroup.id,
                venueId: venueId,
                name: name,
                type: type,
                capacity: capacity,
                price: price,
                description: description,
                startDate: startDate,
                endDate: endDate
            });
            const newEventResponse = {
                id: newEvent.id,
                groupId: foundGroup.id,
                venueId: newEvent.venueId,
                name: newEvent.name,
                type: newEvent.type,
                capacity: newEvent.capacity,
                price: newEvent.price,
                description: newEvent.description,
                startDate: newEvent.startDate,
                endDate: newEvent.endDate
            };
            res.json(newEventResponse);
        } else {
            const err = new Error("Could not create event");
            err.status = 400;
            return next(err);
        }
    }
)

//create a new venue for a group specified by its Id
router.post(
    '/:groupId/venues',
    requireAuth,
    validateVenues,
    async (req, res, next) => {
        const foundGroup = await Group.findByPk(req.params.groupId);

        if (!foundGroup) {
            const err = new Error("Group couldn't be found");
            err.status = 404;
            return next(err);
        }

        const foundCoHost = await Member.findOne({
            where: {
                groupId: req.params.groupId,
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
            const newVenue = await Venue.create({
                groupId: req.params.groupId,
                address: address,
                city: city,
                state: state,
                lat: lat,
                lng: lng
            })
            const newVenueResponse = {
                id: newVenue.id,
                groupId: newVenue.groupId,
                address: newVenue.address,
                city: newVenue.city,
                state: newVenue.state,
                lat: newVenue.lat,
                lng: newVenue.lng
            }
            res.json(newVenueResponse)
        } else {
            const err = new Error("Could not create venue");
            err.status = 400;
            return next(err);
        }
    }
)


//Request membership for a group based on the group Id
router.post(
    '/:groupId/members',
    requireAuth,
    async (req, res, next) => {
        const foundGroup = await Group.findByPk(req.params.groupId)

        if (!foundGroup) {
            const err = new Error("Group couldn't be found");
            err.status = 404;
            return next(err);
        }

        if (foundGroup.organizerId === req.user.id) {
            const err = new Error("Current user is the Organizer of the group");
            err.status = 400;
            return next(err);
        }

        const foundMember = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.user.id
            }
        })

        if (foundMember) {
            if (foundMember.status === 'Pending') {
                const err = new Error("Membership has already been requested");
                err.status = 400;
                return next(err);
            } else if (foundMember.status === 'Member' || foundMember.status === 'Co-Host') {
                const err = new Error("User is already a member of the group");
                err.status = 400;
                return next(err);
            }
        }

        let newApplication = await Member.create({
            groupId: req.params.groupId,
            memberId: req.user.id
        });

        res.json(newApplication);
    }
);

//change the status of a membership specified by id
router.put(
    '/:groupId/members',
    requireAuth,
    async (req, res, next) => {
        const foundGroup = await Group.findByPk(req.params.groupId)

        if (!foundGroup) {
            const err = new Error("Group couldn't be found");
            err.status = 404;
            return next(err);
        }

        const foundCurrUser = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.user.id
            }
        })
        const foundMemberToUpdate = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.body.memberId
            }
        })

        if (!foundMemberToUpdate) {
            const err = new Error("Membership between the user and the group does not exits");
            err.status = 404;
            return next(err);
        }

        if (req.body.status === 'Member') {
            if (foundGroup.organizerId === req.user.id || foundCurrUser.status === 'Co-Host') {
                const { memberId, status } = req.body;

                let updatedmember = await Member.findOne({
                    where: {
                        memberId: memberId,
                        groupId: req.params.groupId
                    },
                    attributes: ['id', 'groupId', 'memberId', 'status']
                })
                updatedmember.status = status;
                await updatedmember.save();

                res.json(updatedmember)
            } else {
                const err = new Error("Current User must be the organizer or a co-host to make someone a member");
                err.status = 403;
                return next(err);
            }
        } else if (req.body.status === 'Co-Host') {
            if (foundGroup.organizerId === req.user.id) {
                const { memberId, status } = req.body;

                let updatedmember = await Member.findOne({
                    where: {
                        memberId: memberId,
                        groupId: req.params.groupId
                    },
                    attributes: ['id', 'groupId', 'memberId', 'status']
                })
                updatedmember.status = status;
                await updatedmember.save();

                res.json(updatedmember)
            } else {
                const err = new Error("Current User must be the organizer to add a co-host");
                err.status = 403;
                return next(err);
            }
        } else if (req.body.status === 'Pending') {
            const err = new Error("Cannot change a membership status to pending");
            err.status = 400;
            return next(err);
        } else {
            const err = new Error("Bad request. Cannot update membership");
            err.status = 400;
            return next(err);
        }
    }
);

//Delete a membership specified by id
router.delete(
    '/:groupId/members',
    requireAuth,
    async (req, res, next) => {

        const foundGroup = await Group.findByPk(req.params.groupId)

        if (!foundGroup) {
            const err = new Error("Group couldn't be found");
            err.status = 404;
            return next(err);
        }

        const foundMemberToDelete = await Member.findOne({
            where: {
                groupId: req.params.groupId,
                memberId: req.body.memberId
            }
        })

        if (!foundMemberToDelete) {
            const err = new Error("Membership does not exist for this User");
            err.status = 404;
            return next(err);
        }

        if (req.user.id !== req.body.memberId) {
            if (foundGroup.organizerId === req.user.id) {
                foundMemberToDelete.destroy();
                res.json({
                    "message": "Successfully deleted membership from group"
                })
            } else {
                const err = new Error("Only the User or organizer may delete a Membership");
                err.status = 403;
                return next(err);
            }
        } else if (req.user.id === req.body.memberId) {
            foundMemberToDelete.destroy();
            res.json({
                "message": "Successfully deleted membership from group"
            })
        } else {
            const err = new Error("Bad request. Cannot delete membership");
            err.status = 400;
            return next(err);
        }
    }
);


//Get group details and number of members from group id
router.get(
    '/:groupId',
    async (req, res, next) => {

        const foundGroup = await Group.findOne({
            include: [
                {
                    model: Image,
                    as: 'images',
                    attributes: ['imageUrl'],
                },
                {
                    model: User,
                    as: 'Organizer'
                },
            ],
            where: {
                id: req.params.groupId
            },
        })

        if (!foundGroup) {
            let err = new Error("Group couldn't be found")
            err.status = 404
            return next(err)
        }

        let members = await foundGroup.getMembers({
            where: {
                status: { [Op.not]: 'Pending' }
            }
        })

        const foundGroupWithMemberCounts = foundGroup.toJSON()
        foundGroupWithMemberCounts.numMembers = members.length
        res.json(foundGroupWithMemberCounts);
    }
);


//Get all groups and number of members
router.get(
    '/',
    async (_req, res) => {
        const foundGroups = await Group.findAll({
            include: [
                {
                    model: Image,
                    as: 'previewImage',
                    attributes: ['imageUrl'],
                    limit: 1
                },
            ],
            order: [['id']]
        })

        const foundGroupsWithMemberCounts = []

        for (let group of foundGroups) {
            let members = await group.getMembers({
                where: {
                    status: { [Op.not]: 'Pending' }
                }
            })
            let updatedGroupObject = group.toJSON()
            updatedGroupObject.numMembers = members.length

            foundGroupsWithMemberCounts.push(updatedGroupObject)
        }

        res.json({ Groups: foundGroupsWithMemberCounts });
    }
);

//create a new group (requires valid logged in user)
router.post(
    '/',
    requireAuth,
    validateGroups,
    async (req, res) => {
        const newGroup = await Group.build({
            organizerId: req.user.id,
            name: req.body.name,
            about: req.body.about,
            type: req.body.type,
            private: req.body.private,
            city: req.body.city,
            state: req.body.state
        })

        await newGroup.save();

        let newGroupResponse = await Group.findByPk(newGroup.id)
        res.statusCode = 201
        res.json(newGroupResponse);
    }
);

//edit a group (requires valid logged in user)
router.put(
    '/:groupId',
    requireAuth,
    validateGroups,
    async (req, res, next) => {
        const foundGroup = await Group.findOne({
            where: {
                id: req.params.groupId
            }
        })

        if (!foundGroup) {
            let newError = new Error("Group couldn't be found")
            newError.status = 404
            return next(newError)
        } else if (req.user.id !== foundGroup.organizerId) {
            let newError = new Error("Current user is not the owner of the group. That are not authorized to edit this group")
            newError.status = 403
            return next(newError)
        } else {
            let { name, about, type, private, city, state } = req.body;
            foundGroup.name = name;
            foundGroup.about = about;
            foundGroup.type = type;
            foundGroup.private = private;
            foundGroup.city = city;
            foundGroup.state = state;

            await foundGroup.save()

            let newGroupResponse = await Group.findByPk(foundGroup.id)

            res.json(newGroupResponse);
        }
    }
);

//edit a group (requires valid logged in user)
router.delete(
    '/:groupId',
    requireAuth,
    async (req, res, next) => {
        const foundGroup = await Group.findByPk(req.params.groupId)

        if (!foundGroup) {
            let newError = new Error("Group couldn't be found");
            newError.status = 404;
            return next(newError)
        }

        if (req.user.id !== foundGroup.organizerId) {
            let newError = new Error("Current user is not the owner of the group, and are not authorized to delete this group");
            newError.status = 403;
            return next(newError);
        }

        await foundGroup.destroy();

        res.status(200)
        res.json({
            "message": "Successfully deleted",
            "statusCode": res.statusCode
        });
    }
);

module.exports = router;
