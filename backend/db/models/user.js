'use strict';

const {Model, Validator} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //method to return an object containing safe data
    toSafeObject() {
      const { id, firstName, lastName, email } = this; // context will be the User instance
      return { id, firstName, lastName, email };
    };

    //method to validate if the password matches the username/email
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    //get a user by id
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    };

    //logs in a user with valid credentials and password
    static async login({ email, password }) {
      const { Op } = require('sequelize');
      //finds the user in the database for the matching credential
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            //credential will be either the username or email
            // username: credential, // commented out as Meetup does not use usernames
            email: email
          }
        }
      });
      //confirms if the password is correct and returns the user data mathcing the id#
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };

    //method to create a new user with the req.body values
    static async signup({ email, firstName, lastName,  password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Group, {foreignKey: 'organizerId', as: 'Organizer', onDelete: 'CASCADE', hooks: true});
      //User.belongsToMany(models.Group, {through: models.UserGroup});
      User.hasMany(models.UserGroup, {foreignKey: 'memberId', onDelete: 'CASCADE', hooks:true})
    }
  };

  User.init({
    //commented out username field as Meetup does not use usernames
    // username: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [4, 30],
    //     isNotEmail(value) {
    //       if (Validator.isEmail(value)) {
    //         throw new Error("Cannot be an email.");
    //       }
    //     }
    //   }
    // },
    firstName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword", "createdAt", "updatedAt"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
