'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Groups',
        //   key: 'id'
        // },
        onDelete: 'CASCADE'
      },
      memberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Users',
        //   key: 'id'
        // },
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    await queryInterface.addIndex('UserGroups', ['groupId', 'memberId'], {unique: true} )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserGroups');
    await queryInterface.removeIndex('UserGroups', ['groupId', 'memberId'], {unique: true});
  }
};
