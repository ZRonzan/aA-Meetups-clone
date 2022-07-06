'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendee.belongsTo(models.Event, {foreignKey: 'eventId'})
      Attendee.belongsTo(models.User, {foreignKey: 'attendeeId'})
    }
  }
  Attendee.init({
    eventId: {
      type: DataTypes.INTEGER,
    },
    attendeeId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};
