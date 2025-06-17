import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  department: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  joining_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'on_leave', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'employees',
  timestamps: true
});

export default Employee;