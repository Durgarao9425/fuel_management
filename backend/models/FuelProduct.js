import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const FuelProduct = sequelize.define('FuelProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price_per_liter: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantity_in_stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  min_stock_alert: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active'
  }
}, {
  tableName: 'fuel_products',
  timestamps: true
});

export default FuelProduct;