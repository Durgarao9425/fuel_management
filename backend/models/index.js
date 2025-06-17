import User from './User.js';
import Customer from './Customer.js';
import Supplier from './Supplier.js';
import Employee from './Employee.js';
import Driver from './Driver.js';
import Vehicle from './Vehicle.js';
import TankDetail from './TankDetail.js';
import FuelProduct from './FuelProduct.js';
import Sale from './Sale.js';
import Invoice from './Invoice.js';

// Define associations
Sale.belongsTo(Employee, { foreignKey: 'emp_id' });
Employee.hasMany(Sale, { foreignKey: 'emp_id' });

export {
  User,
  Customer,
  Supplier,
  Employee,
  Driver,
  Vehicle,
  TankDetail,
  FuelProduct,
  Sale,
  Invoice
};