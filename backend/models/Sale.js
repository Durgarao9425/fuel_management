import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Employee from './Employee.js';

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sale_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  sale_liters: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  sale_price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  emp_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Employee,
      key: 'id'
    }
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fuel_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  transaction_status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'sales',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define association
Sale.belongsTo(Employee, { foreignKey: 'emp_id' });

export default Sale;