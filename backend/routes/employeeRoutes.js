import express from 'express';
import Employee from '../models/Employee.js';
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

// Get all employees
router.get('/', authenticateToken, async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
});

// Get employee by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
});

// Create new employee
router.post('/', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const {
      name,
      phone_number,
      department,
      location,
      joining_date,
      status
    } = req.body;

    // Validate required fields
    if (!name || !phone_number || !department || !location || !joining_date) {
      return res.status(400).json({ 
        message: 'Name, phone number, department, location, and joining date are required fields' 
      });
    }

    // Check if employee with same phone number already exists
    const existingEmployee = await Employee.findOne({ where: { phone_number } });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this phone number already exists' });
    }

    const employee = await Employee.create({
      name,
      phone_number,
      department,
      location,
      joining_date,
      status: status || 'active'
    });

    res.status(201).json({
      message: 'Employee created successfully',
      employee
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
});

// Update employee
router.put('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findByPk(employeeId);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const {
      name,
      phone_number,
      department,
      location,
      joining_date,
      status
    } = req.body;

    // Check if updating to a phone number that already exists
    if (phone_number && phone_number !== employee.phone_number) {
      const existingEmployee = await Employee.findOne({ where: { phone_number } });
      if (existingEmployee) {
        return res.status(400).json({ message: 'Employee with this phone number already exists' });
      }
    }

    // Update employee fields
    await employee.update({
      name: name || employee.name,
      phone_number: phone_number || employee.phone_number,
      department: department || employee.department,
      location: location || employee.location,
      joining_date: joining_date || employee.joining_date,
      status: status || employee.status
    });

    res.status(200).json({
      message: 'Employee updated successfully',
      employee
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
});

// Delete employee
router.delete('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findByPk(employeeId);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.destroy();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
});

export default router;