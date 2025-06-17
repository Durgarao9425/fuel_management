import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TankDetail = sequelize.define('TankDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tank_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  current_level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fuel_type: {
    type: DataTypes.ENUM('Petrol', 'Diesel', 'Gas', 'Kerosene'),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive', 'Maintenance'),
    allowNull: false
  },
  installation_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  last_refill: {
    type: DataTypes.DATE,
    allowNull: true
  },
  last_maintenance: {
    type: DataTypes.DATE,
    allowNull: true
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  sensor_status: {
    type: DataTypes.ENUM('Working', 'Not Working'),
    allowNull: true
  },
  station: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'tank_details',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default TankDetail;