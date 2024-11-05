'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderTicket extends Model {
    static associate(models) {
      OrderTicket.belongsTo(models.Ticket, { foreignKey: 'ticket_id', as: 'ticket' });
      OrderTicket.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  OrderTicket.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    status: {
      type: DataTypes.ENUM('pendente', 'pago', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendente'
    },
  }, {
    sequelize,
    modelName: 'OrderTicket',
  });
  return OrderTicket;
};