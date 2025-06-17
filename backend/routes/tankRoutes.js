import express from 'express';
import TankDetail from '../models/TankDetail.js';
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

// Get all tanks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tanks = await TankDetail.findAll();
    res.status(200).json(tanks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tanks', error: error.message });
  }
});

// Get tank by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const tank = await TankDetail.findByPk(req.params.id);
    if (!tank) {
      return res.status(404).json({ message: 'Tank not found' });
    }
    res.status(200).json(tank);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tank', error: error.message });
  }
});

// Create new tank
router.post('/', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const {
      tank_name,
      capacity,
      current_level,
      fuel_type,
      location,
      status,
      installation_date,
      last_refill,
      last_maintenance,
      temperature,
      sensor_status,
      station
    } = req.body;

    // Validate required fields
    if (!tank_name || !capacity || current_level === undefined || !fuel_type || !location || !status) {
      return res.status(400).json({ 
        message: 'Tank name, capacity, current level, fuel type, location, and status are required fields' 
      });
    }

    // Check if tank with same name already exists
    const existingTank = await TankDetail.findOne({ where: { tank_name } });
    if (existingTank) {
      return res.status(400).json({ message: 'Tank with this name already exists' });
    }

    const tank = await TankDetail.create({
      tank_name,
      capacity,
      current_level,
      fuel_type,
      location,
      status,
      installation_date: installation_date || new Date(),
      last_refill,
      last_maintenance,
      temperature,
      sensor_status,
      station
    });

    res.status(201).json({
      message: 'Tank created successfully',
      tank
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tank', error: error.message });
  }
});

// Update tank
router.put('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const tankId = req.params.id;
    const tank = await TankDetail.findByPk(tankId);
    
    if (!tank) {
      return res.status(404).json({ message: 'Tank not found' });
    }

    const {
      tank_name,
      capacity,
      current_level,
      fuel_type,
      location,
      status,
      installation_date,
      last_refill,
      last_maintenance,
      temperature,
      sensor_status,
      station
    } = req.body;

    // Check if updating to a tank name that already exists
    if (tank_name && tank_name !== tank.tank_name) {
      const existingTank = await TankDetail.findOne({ where: { tank_name } });
      if (existingTank) {
        return res.status(400).json({ message: 'Tank with this name already exists' });
      }
    }

    // Update tank fields
    await tank.update({
      tank_name: tank_name || tank.tank_name,
      capacity: capacity !== undefined ? capacity : tank.capacity,
      current_level: current_level !== undefined ? current_level : tank.current_level,
      fuel_type: fuel_type || tank.fuel_type,
      location: location || tank.location,
      status: status || tank.status,
      installation_date: installation_date || tank.installation_date,
      last_refill: last_refill !== undefined ? last_refill : tank.last_refill,
      last_maintenance: last_maintenance !== undefined ? last_maintenance : tank.last_maintenance,
      temperature: temperature !== undefined ? temperature : tank.temperature,
      sensor_status: sensor_status !== undefined ? sensor_status : tank.sensor_status,
      station: station !== undefined ? station : tank.station
    });

    res.status(200).json({
      message: 'Tank updated successfully',
      tank
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating tank', error: error.message });
  }
});

// Delete tank
router.delete('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const tankId = req.params.id;
    const tank = await TankDetail.findByPk(tankId);
    
    if (!tank) {
      return res.status(404).json({ message: 'Tank not found' });
    }

    await tank.destroy();
    res.status(200).json({ message: 'Tank deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tank', error: error.message });
  }
});

export default router;
