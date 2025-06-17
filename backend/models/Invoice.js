import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Invoice = sequelize.define('Invoice', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoice_number: { type: DataTypes.STRING, allowNull: false },
  customer_id: { type: DataTypes.INTEGER, allowNull: false },
  supplier_id: { type: DataTypes.INTEGER, allowNull: false },
  fuel_type: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.FLOAT, allowNull: false },
  price_per_unit: { type: DataTypes.FLOAT, allowNull: false },
  tax_rate: { type: DataTypes.FLOAT, allowNull: false },
  total_amount: { type: DataTypes.FLOAT, allowNull: false },
  payment_status: { type: DataTypes.STRING, allowNull: false },
  payment_method: { type: DataTypes.STRING, allowNull: false },
  due_date: { type: DataTypes.DATE, allowNull: false },
  issued_date: { type: DataTypes.DATE, allowNull: false },
  notes: { type: DataTypes.TEXT, allowNull: true },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'invoices',
  timestamps: false
});

export default Invoice;
