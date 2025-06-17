import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  supplier_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contact_person: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pricing_terms: {
    type: DataTypes.STRING,
    allowNull: true
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bank_account: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tax_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  credit_limit: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  contract_start: {
    type: DataTypes.DATE,
    allowNull: true
  },
  contract_end: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'suppliers',
  timestamps: false
});

export default Supplier;