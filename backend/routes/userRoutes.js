import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

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

// Middleware to check if user is superadmin
const isSuperAdmin = (req, res, next) => {
  if (req.user.role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. SuperAdmin privileges required.' });
  }
};

// Register a new user (only accessible by admin or superadmin)
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create new user
    const user = await User.create({
      email,
      password,
      role: role || 'user'
    });
    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login route (for /api/login)
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
    const validPassword = await user.isValidPassword(password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all users (admin/superadmin only)
router.get('/', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'role', 'createdAt', 'updatedAt']
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get user by ID (admin/superadmin or own profile)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Check if user is requesting their own profile or is admin/superadmin
    if (req.user.id !== userId && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Access denied. You can only view your own profile.' });
    }
    
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'role', 'createdAt', 'updatedAt']
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Update user (admin/superadmin or own profile)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { email, password, role } = req.body;
    
    // Check if user is updating their own profile or is admin/superadmin
    if (req.user.id !== userId && req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Access denied. You can only update your own profile.' });
    }
    
    // Only superadmin can change roles
    if (role && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Access denied. Only superadmin can change roles.' });
    }
    
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user fields
    if (email) user.email = email;
    if (password) user.password = password;
    if (role && req.user.role === 'superadmin') user.role = role;
    
    await user.save();
    
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Delete user (admin/superadmin only)
router.delete('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Prevent superadmin deletion by admin
    const userToDelete = await User.findByPk(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (userToDelete.role === 'superadmin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Access denied. Only superadmin can delete superadmin accounts.' });
    }
    
    await userToDelete.destroy();
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Create superadmin (only for initial setup or by existing superadmin)
router.post('/create-superadmin', async (req, res) => {
  try {
    const { email, password, secretKey } = req.body;
    
    // Check if the secret key matches (for initial setup)
    if (secretKey !== 'fuel_management_setup_key') {
      return res.status(403).json({ message: 'Invalid secret key' });
    }
    
    // Check if superadmin already exists
    const existingSuperAdmin = await User.findOne({ where: { role: 'superadmin' } });
    if (existingSuperAdmin) {
      return res.status(400).json({ message: 'SuperAdmin already exists' });
    }
    
    // Create superadmin
    const superAdmin = await User.create({
      email,
      password,
      role: 'superadmin'
    });
    
    res.status(201).json({
      message: 'SuperAdmin created successfully',
      user: {
        id: superAdmin.id,
        email: superAdmin.email,
        role: superAdmin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating SuperAdmin', error: error.message });
  }
});

// Get current user profile (for session restore)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'role', 'createdAt', 'updatedAt']
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
});

export default router;