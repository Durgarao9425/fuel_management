import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import * as models from './models/index.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import tankRoutes from './routes/tankRoutes.js';
import fuelProductRoutes from './routes/fuelProductRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/tanks', tankRoutes);
app.use('/api/fuel-products', fuelProductRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/invoices', invoiceRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Fuel Management System API' });
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database (in development)
    // In production, use migrations instead
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();