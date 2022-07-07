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
      Attendee.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Attendee.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: 'Pending',
      validate: {
        check(val) {
          const validStatus = ['Waitlist', 'Member', 'Pending']
          if (!validStatus.includes(val)) throw new Error('Status must be valid');
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};
