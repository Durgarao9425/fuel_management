import express from 'express';
import Driver from '../models/Driver.js';
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

// Get all drivers
router.get('/', authenticateToken, async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers', error: error.message });
  }
});

// Get driver by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver', error: error.message });
  }
});

// Create new driver
router.post('/', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const {
      driver_name,
      phone,
      dl_number,
      dl_exp_date,
      aadhar_number,
      reference_name,
      alternative_number,
      address,
      image,
      location,
      opening_balance
    } = req.body;

    // Validate required fields
    if (!driver_name || !phone || !dl_number || !dl_exp_date || !aadhar_number) {
      return res.status(400).json({ 
        message: 'Driver name, phone, DL number, DL expiry date, and Aadhar number are required fields' 
      });
    }

    // Check if driver with same DL number already exists
    const existingDriverByDL = await Driver.findOne({ where: { dl_number } });
    if (existingDriverByDL) {
      return res.status(400).json({ message: 'Driver with this DL number already exists' });
    }

    // Check if driver with same Aadhar number already exists
    const existingDriverByAadhar = await Driver.findOne({ where: { aadhar_number } });
    if (existingDriverByAadhar) {
      return res.status(400).json({ message: 'Driver with this Aadhar number already exists' });
    }

    const driver = await Driver.create({
      driver_name,
      phone,
      dl_number,
      dl_exp_date,
      aadhar_number,
      reference_name,
      alternative_number,
      address,
      image,
      location,
      opening_balance: opening_balance || 0
    });

    res.status(201).json({
      message: 'Driver created successfully',
      driver
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating driver', error: error.message });
  }
});

// Update driver
router.put('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const driverId = req.params.id;
    const driver = await Driver.findByPk(driverId);
    
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    const {
      driver_name,
      phone,
      dl_number,
      dl_exp_date,
      aadhar_number,
      reference_name,
      alternative_number,
      address,
      image,
      location,
      opening_balance
    } = req.body;

    // Check if updating to a DL number that already exists
    if (dl_number && dl_number !== driver.dl_number) {
      const existingDriver = await Driver.findOne({ where: { dl_number } });
      if (existingDriver) {
        return res.status(400).json({ message: 'Driver with this DL number already exists' });
      }
    }

    // Check if updating to an Aadhar number that already exists
    if (aadhar_number && aadhar_number !== driver.aadhar_number) {
      const existingDriver = await Driver.findOne({ where: { aadhar_number } });
      if (existingDriver) {
        return res.status(400).json({ message: 'Driver with this Aadhar number already exists' });
      }
    }

    // Update driver fields
    await driver.update({
      driver_name: driver_name || driver.driver_name,
      phone: phone || driver.phone,
      dl_number: dl_number || driver.dl_number,
      dl_exp_date: dl_exp_date || driver.dl_exp_date,
      aadhar_number: aadhar_number || driver.aadhar_number,
      reference_name: reference_name !== undefined ? reference_name : driver.reference_name,
      alternative_number: alternative_number !== undefined ? alternative_number : driver.alternative_number,
      address: address !== undefined ? address : driver.address,
      image: image !== undefined ? image : driver.image,
      location: location !== undefined ? location : driver.location,
      opening_balance: opening_balance !== undefined ? opening_balance : driver.opening_balance
    });

    res.status(200).json({
      message: 'Driver updated successfully',
      driver
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver', error: error.message });
  }
});

// Delete driver
router.delete('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const driverId = req.params.id;
    const driver = await Driver.findByPk(driverId);
    
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    await driver.destroy();
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting driver', error: error.message });
  }
});

export default router;