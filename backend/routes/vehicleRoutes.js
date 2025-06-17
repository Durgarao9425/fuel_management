import express from 'express';
import Vehicle from '../models/Vehicle.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user;
    next();
  });
};

// Middleware to check if user is admin or superadmin
const isAdminOrSuperAdmin = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

// Get all vehicles
router.get('/', authenticateToken, async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
});

// Get vehicle by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle', error: error.message });
  }
});

// Create new vehicle
router.post('/', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const {
      vehicle_no,
      transport_name,
      vehicle_type,
      vehicle_make,
      model,
      manf_year,
      fin_name,
      emi_start_date,
      emi_end_date,
      emi_amount,
      debit_bank_account,
      fitness_start_date,
      fitness_end_date,
      insurance_start_date,
      insurance_end_date,
      insurance_company,
      insurance_number,
      permit_start_date,
      permit_end_date,
      pollution_start_date,
      pollution_end_date,
      state_tax,
      tax_latest_paid_date,
      tax_validate
    } = req.body;

    // Validate required fields
    if (!vehicle_no || !transport_name || !vehicle_type) {
      return res.status(400).json({ 
        message: 'Vehicle number, transport name, and vehicle type are required fields' 
      });
    }

    // Check if vehicle with same number already exists
    const existingVehicle = await Vehicle.findOne({ where: { vehicle_no } });
    if (existingVehicle) {
      return res.status(400).json({ message: 'Vehicle with this number already exists' });
    }

    const vehicle = await Vehicle.create({
      vehicle_no,
      transport_name,
      vehicle_type,
      vehicle_make,
      model,
      manf_year,
      fin_name,
      emi_start_date,
      emi_end_date,
      emi_amount,
      debit_bank_account,
      fitness_start_date,
      fitness_end_date,
      insurance_start_date,
      insurance_end_date,
      insurance_company,
      insurance_number,
      permit_start_date,
      permit_end_date,
      pollution_start_date,
      pollution_end_date,
      state_tax,
      tax_latest_paid_date,
      tax_validate
    });

    res.status(201).json({
      message: 'Vehicle created successfully',
      vehicle
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error: error.message });
  }
});

// Update vehicle
router.put('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findByPk(vehicleId);
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const {
      vehicle_no,
      transport_name,
      vehicle_type,
      vehicle_make,
      model,
      manf_year,
      fin_name,
      emi_start_date,
      emi_end_date,
      emi_amount,
      debit_bank_account,
      fitness_start_date,
      fitness_end_date,
      insurance_start_date,
      insurance_end_date,
      insurance_company,
      insurance_number,
      permit_start_date,
      permit_end_date,
      pollution_start_date,
      pollution_end_date,
      state_tax,
      tax_latest_paid_date,
      tax_validate
    } = req.body;

    // Check if updating to a vehicle number that already exists
    if (vehicle_no && vehicle_no !== vehicle.vehicle_no) {
      const existingVehicle = await Vehicle.findOne({ where: { vehicle_no } });
      if (existingVehicle) {
        return res.status(400).json({ message: 'Vehicle with this number already exists' });
      }
    }

    // Update vehicle fields
    await vehicle.update({
      vehicle_no: vehicle_no || vehicle.vehicle_no,
      transport_name: transport_name || vehicle.transport_name,
      vehicle_type: vehicle_type || vehicle.vehicle_type,
      vehicle_make: vehicle_make !== undefined ? vehicle_make : vehicle.vehicle_make,
      model: model !== undefined ? model : vehicle.model,
      manf_year: manf_year !== undefined ? manf_year : vehicle.manf_year,
      fin_name: fin_name !== undefined ? fin_name : vehicle.fin_name,
      emi_start_date: emi_start_date !== undefined ? emi_start_date : vehicle.emi_start_date,
      emi_end_date: emi_end_date !== undefined ? emi_end_date : vehicle.emi_end_date,
      emi_amount: emi_amount !== undefined ? emi_amount : vehicle.emi_amount,
      debit_bank_account: debit_bank_account !== undefined ? debit_bank_account : vehicle.debit_bank_account,
      fitness_start_date: fitness_start_date !== undefined ? fitness_start_date : vehicle.fitness_start_date,
      fitness_end_date: fitness_end_date !== undefined ? fitness_end_date : vehicle.fitness_end_date,
      insurance_start_date: insurance_start_date !== undefined ? insurance_start_date : vehicle.insurance_start_date,
      insurance_end_date: insurance_end_date !== undefined ? insurance_end_date : vehicle.insurance_end_date,
      insurance_company: insurance_company !== undefined ? insurance_company : vehicle.insurance_company,
      insurance_number: insurance_number !== undefined ? insurance_number : vehicle.insurance_number,
      permit_start_date: permit_start_date !== undefined ? permit_start_date : vehicle.permit_start_date,
      permit_end_date: permit_end_date !== undefined ? permit_end_date : vehicle.permit_end_date,
      pollution_start_date: pollution_start_date !== undefined ? pollution_start_date : vehicle.pollution_start_date,
      pollution_end_date: pollution_end_date !== undefined ? pollution_end_date : vehicle.pollution_end_date,
      state_tax: state_tax !== undefined ? state_tax : vehicle.state_tax,
      tax_latest_paid_date: tax_latest_paid_date !== undefined ? tax_latest_paid_date : vehicle.tax_latest_paid_date,
      tax_validate: tax_validate !== undefined ? tax_validate : vehicle.tax_validate
    });

    res.status(200).json({
      message: 'Vehicle updated successfully',
      vehicle
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error: error.message });
  }
});

// Delete vehicle
router.delete('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findByPk(vehicleId);
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    await vehicle.destroy();
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
  }
});

export default router;