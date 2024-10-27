'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
      Ticket.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  Ticket.init({
    booking_date: { //data de inscrição
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    ticket_type: {
      type: DataTypes.ENUM('meia', 'inteira'),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('confirmado', 'pendente', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendente'
    },
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};