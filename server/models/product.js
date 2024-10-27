'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Product.belongsToMany(models.Order, { through: models.OrderProduct, foreignKey: 'product_id', as: 'orders' })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ativo', 'inativo'),
      allowNull: false,
      defaultValue: 'ativo'
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};