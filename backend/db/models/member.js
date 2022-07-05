'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsTo(models.User, {foreignKey: 'memberId'})
      Member.belongsTo(models.Group, {foreignKey: 'groupId'})
    }
  }
  Member.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
      validate: {
        check(val) {
          const validStatus = ['Co-Host', 'Member', 'Pending']
          if (!validStatus.includes(val)) throw new Error('Status must be valid');
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};
