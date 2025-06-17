import express from 'express';
import { Op } from 'sequelize';
import Sale from '../models/Sale.js';
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

// Get all sales
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'department']
        }
      ]
    });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales', error: error.message });
  }
});

// Get sale by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'department']
        }
      ]
    });
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sale', error: error.message });
  }
});

// Create new sale
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      sale_date,
      sale_liters,
      sale_price,
      emp_id,
      payment_method,
      fuel_type,
      total_amount,
      transaction_status
    } = req.body;

    // Validate required fields
    if (!sale_date || !sale_liters || !sale_price || !payment_method || !fuel_type || !total_amount || !transaction_status) {
      return res.status(400).json({ 
        message: 'Sale date, liters, price, payment method, fuel type, total amount, and transaction status are required fields' 
      });
    }

    // Check if employee exists if emp_id is provided
    if (emp_id) {
      const employee = await Employee.findByPk(emp_id);
      if (!employee) {
        return res.status(400).json({ message: 'Employee not found' });
      }
    }

    const sale = await Sale.create({
      sale_date,
      sale_liters,
      sale_price,
      emp_id,
      payment_method,
      fuel_type,
      total_amount,
      transaction_status
    });

    res.status(201).json({
      message: 'Sale created successfully',
      sale
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating sale', error: error.message });
  }
});

// Update sale
router.put('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await Sale.findByPk(saleId);
    
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    const {
      sale_date,
      sale_liters,
      sale_price,
      emp_id,
      payment_method,
      fuel_type,
      total_amount,
      transaction_status
    } = req.body;

    // Check if employee exists if emp_id is provided
    if (emp_id && emp_id !== sale.emp_id) {
      const employee = await Employee.findByPk(emp_id);
      if (!employee) {
        return res.status(400).json({ message: 'Employee not found' });
      }
    }

    // Update sale fields
    await sale.update({
      sale_date: sale_date || sale.sale_date,
      sale_liters: sale_liters !== undefined ? sale_liters : sale.sale_liters,
      sale_price: sale_price !== undefined ? sale_price : sale.sale_price,
      emp_id: emp_id !== undefined ? emp_id : sale.emp_id,
      payment_method: payment_method || sale.payment_method,
      fuel_type: fuel_type || sale.fuel_type,
      total_amount: total_amount !== undefined ? total_amount : sale.total_amount,
      transaction_status: transaction_status || sale.transaction_status
    });

    res.status(200).json({
      message: 'Sale updated successfully',
      sale
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating sale', error: error.message });
  }
});

// Delete sale
router.delete('/:id', authenticateToken, isAdminOrSuperAdmin, async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await Sale.findByPk(saleId);
    
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    await sale.destroy();
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sale', error: error.message });
  }
});

// Get sales by date range
router.get('/report/date-range', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const sales = await Sale.findAll({
      where: {
        sale_date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'department']
        }
      ]
    });

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales report', error: error.message });
  }
});

export default router;