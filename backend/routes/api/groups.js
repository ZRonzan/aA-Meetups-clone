// backend/routes/api/session.js
const express = require('express')

//importing authentication middleware and models from phase 03:
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Group, sequelize, Member, User, Image } = require('../../db/models');
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
        .withMessage('Type must be Online or In person'),
    check('private')
        .exists({ checkFalsy: true })
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
//----------------------------------------------------------

router.use(restoreUser)

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

        if(req.user && req.user.id && req.user.id === foundGroup.organizerId) {
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
                            status: {[Op.not]: 'Pending'}
                        }
                    }
            });
        }

        res.json(foundMembers)
    }
);

//Get group details and number of members from group id
router.get(
    '/:groupId',
    async (req, res, next) => {
        const foundGroup = await Group.findOne({
            where: {
                id: req.params.groupId
            },
            include: [
                { model: Member, attributes: [] },
                { model: User, as: "Organizer" }
            ],
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("Members.groupId")), "numMembers"]],
            },
            group: ['Members.groupId']
        });

        if (!foundGroup) {
            let err = new Error("Group couldn't be found")
            err.status = 404
            return next(err)
        }

        const images = await Image.findAll({
            where: {
                groupId: req.params.groupId
            }
        });

        let modifiedGroup = foundGroup.toJSON()
        modifiedGroup.images = images

        res.json(modifiedGroup);
    }
);


//Get all groups and number of members
router.get(
    '/',
    async (_req, res) => {
        const foundGroups = await Group.findAll({
            include: [
                {
                    model: Member,
                    attributes: []
                },
                {
                    model: Image,
                    as: 'previewImage',
                    attributes: ['imageUrl'],
                    limit: 1
                }
            ],
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("Members.groupId")), "numMembers"]],
            },
            group: ['Members.groupId'],
            order: [['id']]
        })

        res.json(foundGroups);
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
            let { name, about, type, private, city, state} = req.body;
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
            let newError = new Error("Current user is not the owner of the group. That are not authorized to delete this group");
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
