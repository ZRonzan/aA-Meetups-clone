// backend/routes/api/session.js
const express = require('express')

//importing authentication middleware and User model from phase 03:
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Group, sequelize, UserGroup, User, Image } = require('../../db/models');
//------------------------------------------------------------------
//---------------importing for phase 05-----------------------------
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//------------------------------------------------------------------

const router = express.Router();

//middleware for phase 05 to validate keys from the req.body
const validateGroups = [
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({max:60})
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true })
        .isLength({min: 50})
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
    '/:groupId',
    async (req, res, next) => {
        const foundGroup = await Group.findOne({
            where: {
                id: req.params.groupId
            },
            include: [
                { model: UserGroup, attributes: [] },
                { model: User, as: "Organizer" }
            ],
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("UserGroups.groupId")), "numMembers"]],
            },
            group: ['UserGroups.groupId']
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
            include: {
                model: UserGroup,
                attributes: []
            },
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("UserGroups.groupId")), "numMembers"]],
            },
            group: ['UserGroups.groupId'],
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
            state: req.body.state,
            previewImage: req.body.previewImage
        })

        await newGroup.save();

        let newGroupResponse = await Group.findByPk(newGroup.id, {
            attributes: {
                exclude: ['previewImage']
            }
        })

        res.json(newGroupResponse);
    }
);

module.exports = router;
