import express from 'express';
import FuelProduct from '../models/FuelProduct.js';
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

// Get all fuel products
router.get('/', authenticateToken, async (req, res) => {
  try {
    const fuelProducts = await FuelProduct.findAll();
    res.status(200).json(fuelProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fuel products', error: error.message });
  }
});

// Get fuel product by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const fuelProduct = await FuelProduct.findByPk(req.params.id);
    if (!fuelProduct) {
      return res.status(404).json({ message: 'Fuel product not found' });
    }
    res.status(200).json(fuelProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fuel product', error: error.message });
  }
});

// Create new fuel product
router.post('/', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const {
      product_code,
      product_name,
      price_per_liter,
      quantity_in_stock,
      min_stock_alert,
      status
    } = req.body;

    // Validate required fields
    if (!product_code || !product_name || price_per_liter === undefined || quantity_in_stock === undefined) {
      return res.status(400).json({ 
        message: 'Product code, product name, price per liter, and quantity in stock are required fields' 
      });
    }

    // Check if fuel product with same code already exists
    const existingProduct = await FuelProduct.findOne({ where: { product_code } });
    if (existingProduct) {
      return res.status(400).json({ message: 'Fuel product with this code already exists' });
    }

    const fuelProduct = await FuelProduct.create({
      product_code,
      product_name,
      price_per_liter,
      quantity_in_stock,
      min_stock_alert: min_stock_alert || 0,
      status: status || 'Active'
    });

    res.status(201).json({
      message: 'Fuel product created successfully',
      fuelProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating fuel product', error: error.message });
  }
});

// Update fuel product
router.put('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const fuelProduct = await FuelProduct.findByPk(productId);
    
    if (!fuelProduct) {
      return res.status(404).json({ message: 'Fuel product not found' });
    }

    const {
      product_code,
      product_name,
      price_per_liter,
      quantity_in_stock,
      min_stock_alert,
      status
    } = req.body;

    // Check if updating to a product code that already exists
    if (product_code && product_code !== fuelProduct.product_code) {
      const existingProduct = await FuelProduct.findOne({ where: { product_code } });
      if (existingProduct) {
        return res.status(400).json({ message: 'Fuel product with this code already exists' });
      }
    }

    // Update fuel product fields
    await fuelProduct.update({
      product_code: product_code || fuelProduct.product_code,
      product_name: product_name || fuelProduct.product_name,
      price_per_liter: price_per_liter !== undefined ? price_per_liter : fuelProduct.price_per_liter,
      quantity_in_stock: quantity_in_stock !== undefined ? quantity_in_stock : fuelProduct.quantity_in_stock,
      min_stock_alert: min_stock_alert !== undefined ? min_stock_alert : fuelProduct.min_stock_alert,
      status: status || fuelProduct.status
    });

    res.status(200).json({
      message: 'Fuel product updated successfully',
      fuelProduct
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating fuel product', error: error.message });
  }
});

// Delete fuel product
router.delete('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const fuelProduct = await FuelProduct.findByPk(productId);
    
    if (!fuelProduct) {
      return res.status(404).json({ message: 'Fuel product not found' });
    }

    await fuelProduct.destroy();
    res.status(200).json({ message: 'Fuel product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting fuel product', error: error.message });
  }
});

export default router;