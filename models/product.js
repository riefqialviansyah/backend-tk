"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Category name is required" },
          notEmpty: { msg: "Category name is required" },
        },
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "SKU already used" },
        validate: {
          notNull: { msg: "SKU is required" },
          notEmpty: { msg: "SKU is required" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name is required" },
        },
      },
      description: DataTypes.TEXT,
      weight: DataTypes.INTEGER,
      image: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Price is required" },
          notEmpty: { msg: "Price is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
