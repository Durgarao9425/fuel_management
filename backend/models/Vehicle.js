import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vehicle_no: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  transport_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vehicle_type: {
    type: DataTypes.ENUM('truck', 'van', 'car', 'bike', 'other'),
    defaultValue: 'other',
    allowNull: false
  },
  vehicle_make: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  model: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  manf_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fin_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  emi_start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  emi_end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  emi_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  debit_bank_account: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  fitness_start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fitness_end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  insurance_start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  insurance_end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  insurance_company: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  insurance_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  permit_start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  permit_end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pollution_start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pollution_end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  state_tax: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  tax_latest_paid_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tax_validate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'vehicles',
  timestamps: false
});

export default Vehicle;