import express from 'express';
import Supplier from '../models/Supplier.js';
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

// Get all suppliers
router.get('/', authenticateToken, async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
  }
});

// Get supplier by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching supplier', error: error.message });
  }
});

// Create new supplier
router.post('/', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const {
      supplier_name,
      contact_person,
      email,
      phone,
      address,
      city,
      state,
      zip_code,
      country,
      fuel_types,
      pricing_terms,
      payment_method,
      bank_account,
      tax_id,
      credit_limit,
      contract_start,
      contract_end,
      status,
      notes
    } = req.body;

    // Validate required fields
    if (!contact_person) {
      return res.status(400).json({ message: 'Contact person is required' });
    }

    // Check if supplier with same email already exists
    if (email) {
      const existingSupplier = await Supplier.findOne({ where: { email } });
      if (existingSupplier) {
        return res.status(400).json({ message: 'Supplier with this email already exists' });
      }
    }

    const supplier = await Supplier.create({
      supplier_name,
      contact_person,
      email,
      phone,
      address,
      city,
      state,
      zip_code,
      country,
      fuel_types,
      pricing_terms,
      payment_method,
      bank_account,
      tax_id,
      credit_limit,
      contract_start,
      contract_end,
      status: status || 'Active',
      notes
    });

    res.status(201).json({
      message: 'Supplier created successfully',
      supplier
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating supplier', error: error.message });
  }
});

// Update supplier
router.put('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const supplierId = req.params.id;
    const supplier = await Supplier.findByPk(supplierId);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const {
      supplier_name,
      contact_person,
      email,
      phone,
      address,
      city,
      state,
      zip_code,
      country,
      fuel_types,
      pricing_terms,
      payment_method,
      bank_account,
      tax_id,
      credit_limit,
      contract_start,
      contract_end,
      status,
      notes
    } = req.body;

    // Check if updating to an email that already exists
    if (email && email !== supplier.email) {
      const existingSupplier = await Supplier.findOne({ where: { email } });
      if (existingSupplier) {
        return res.status(400).json({ message: 'Supplier with this email already exists' });
      }
    }

    // Update supplier fields
    await supplier.update({
      supplier_name: supplier_name !== undefined ? supplier_name : supplier.supplier_name,
      contact_person: contact_person || supplier.contact_person,
      email: email !== undefined ? email : supplier.email,
      phone: phone !== undefined ? phone : supplier.phone,
      address: address !== undefined ? address : supplier.address,
      city: city !== undefined ? city : supplier.city,
      state: state !== undefined ? state : supplier.state,
      zip_code: zip_code !== undefined ? zip_code : supplier.zip_code,
      country: country !== undefined ? country : supplier.country,
      fuel_types: fuel_types !== undefined ? fuel_types : supplier.fuel_types,
      pricing_terms: pricing_terms !== undefined ? pricing_terms : supplier.pricing_terms,
      payment_method: payment_method !== undefined ? payment_method : supplier.payment_method,
      bank_account: bank_account !== undefined ? bank_account : supplier.bank_account,
      tax_id: tax_id !== undefined ? tax_id : supplier.tax_id,
      credit_limit: credit_limit !== undefined ? credit_limit : supplier.credit_limit,
      contract_start: contract_start !== undefined ? contract_start : supplier.contract_start,
      contract_end: contract_end !== undefined ? contract_end : supplier.contract_end,
      status: status || supplier.status,
      notes: notes !== undefined ? notes : supplier.notes
    });

    res.status(200).json({
      message: 'Supplier updated successfully',
      supplier
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating supplier', error: error.message });
  }
});

// Delete supplier
router.delete('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const supplierId = req.params.id;
    const supplier = await Supplier.findByPk(supplierId);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    await supplier.destroy();
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier', error: error.message });
  }
});

export default router;