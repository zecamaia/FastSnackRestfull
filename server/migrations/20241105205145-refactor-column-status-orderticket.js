'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('orderTickets', 'status', {
      type: Sequelize.ENUM('pendente', 'confirmado', 'cancelado'),
      allowNull: false
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('orderTickets', 'status', {
      type: Sequelize.ENUM(''), 
      allowNull: true 
    });
  }
};
