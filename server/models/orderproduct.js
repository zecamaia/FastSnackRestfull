'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      OrderProduct.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
      OrderProduct.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    }
  }
  OrderProduct.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrderProduct',
    timestamps: true
  });
  return OrderProduct;
};