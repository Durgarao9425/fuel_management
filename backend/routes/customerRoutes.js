import express from 'express';
import Customer from '../models/Customer.js';
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

// Get all customers
router.get('/', authenticateToken, async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
});

// Get customer by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error: error.message });
  }
});

// Create new customer
router.post('/', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      zip_code,
      country,
      customer_type,
      company_name,
      tax_id,
      credit_limit,
      notes
    } = req.body;

    // Validate required fields
    if (!name || !phone || !customer_type) {
      return res.status(400).json({ message: 'Name, phone, and customer type are required fields' });
    }

    // Check if customer with same email already exists
    if (email) {
      const existingCustomer = await Customer.findOne({ where: { email } });
      if (existingCustomer) {
        return res.status(400).json({ message: 'Customer with this email already exists' });
      }
    }

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
      city,
      state,
      zip_code,
      country,
      customer_type,
      company_name,
      tax_id,
      credit_limit,
      notes
    });

    res.status(201).json({
      message: 'Customer created successfully',
      customer
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
});

// Update customer
router.put('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByPk(customerId);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      zip_code,
      country,
      customer_type,
      company_name,
      tax_id,
      credit_limit,
      notes
    } = req.body;

    // Check if updating to an email that already exists
    if (email && email !== customer.email) {
      const existingCustomer = await Customer.findOne({ where: { email } });
      if (existingCustomer) {
        return res.status(400).json({ message: 'Customer with this email already exists' });
      }
    }

    // Update customer fields
    await customer.update({
      name: name || customer.name,
      email: email || customer.email,
      phone: phone || customer.phone,
      address: address !== undefined ? address : customer.address,
      city: city !== undefined ? city : customer.city,
      state: state !== undefined ? state : customer.state,
      zip_code: zip_code !== undefined ? zip_code : customer.zip_code,
      country: country !== undefined ? country : customer.country,
      customer_type: customer_type || customer.customer_type,
      company_name: company_name !== undefined ? company_name : customer.company_name,
      tax_id: tax_id !== undefined ? tax_id : customer.tax_id,
      credit_limit: credit_limit !== undefined ? credit_limit : customer.credit_limit,
      notes: notes !== undefined ? notes : customer.notes
    });

    res.status(200).json({
      message: 'Customer updated successfully',
      customer
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
});

// Delete customer
router.delete('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByPk(customerId);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.destroy();
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
});

export default router;