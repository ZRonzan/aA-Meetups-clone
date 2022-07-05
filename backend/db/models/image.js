'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Group, {foreignKey: 'groupId', as: 'previewImage'})
      Image.belongsTo(models.Group, {foreignKey: 'groupId', as: 'images'})
    }
  }
  Image.init({
    groupId: {
      type:DataTypes.INTEGER,
      validate: {
        multipleGroupsCheck(val) {
          if(val && (this.venueId || this.eventId)) {
            throw new Error('This image cannot be uploaded to multiple groups at once')
          }
        },
        allNullCheck(val) {
          if(!val && !this.venueId && !this.eventId) {
            throw new Error('This image cannot be uploaded to multiple groups at once')
          }
        }
      },
      onDelete: 'CASCADE'
    },
    venueId: {
      type: DataTypes.INTEGER,
      validate: {
        multipleGroupsCheck(val) {
          if(val && (this.groupId || this.eventId)) {
            throw new Error('This image cannot be uploaded to multiple groups at once')
          }
        },
        allNullCheck(val) {
          if(!val && !this.groupId && !this.eventId) {
            throw new Error('This image cannot be uploaded to multiple groups at once')
          }
        }
      }
    },
    eventId: {
      type: DataTypes.INTEGER,
      validate: {
        multipleGroupsCheck(val) {
          if(val && (this.venueId === null || this.groupId === null)) {
            throw new Error('This image cannot be uploaded to multiple groups at once')
          }
        },
        allNullCheck(val) {
          if(!val && !this.venueId && !this.groupId) {
            throw new Error('This image cannot be uploaded to multiple groups at once')
          }
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Image',
    // defaultScope: {
    //   attributes: ['imageUrl']
    // }
  });
  return Image;
};
