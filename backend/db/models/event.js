'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.Attendee, {foreignKey: 'eventId', onDelete: 'CASCADE', hooks: true})
      Event.hasMany(models.Image, {foreignKey: 'eventId', as: 'previewImage',  onDelete: 'CASCADE', hooks: true})
      Event.belongsTo(models.Venue, {foreignKey: 'venueId'})
      Event.belongsTo(models.Group, {foreignKey: 'groupId'})
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        check(val) {
          if (val.length < 5) throw new Error('Name must be at leeast 5 characters long');
        }
      }
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        check(val) {
          const validStatus = ['Online', 'In Person']
          if (!validStatus.includes(val)) throw new Error('Type must be Online or In Person');
        }
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        checkDateStart(val) {
          if (Date.parse(val) < Date.parse(new Date())) throw new Error("startDate must be in the future")
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        checkDate(val) {
          if (Date.parse(this.startDate) - Date.parse(val) > 0) throw new Error("endDate must occur after the startDate")
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Event',
    // defaultScope: {
    //   attributes:{
    //     include: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate']
    //   }
    // }
  });
  return Event;
};
