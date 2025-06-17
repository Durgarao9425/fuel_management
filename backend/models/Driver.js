import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Driver = sequelize.define('Driver', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  driver_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dl_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dl_exp_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  aadhar_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reference_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  alternative_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  opening_balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'drivers',
  timestamps: true
});

export default Driver;