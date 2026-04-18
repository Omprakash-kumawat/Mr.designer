const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// User routes
router.post('/', authMiddleware.protect, orderController.createOrder);
router.get('/myorders', authMiddleware.protect, orderController.getUserOrders);

// Admin routes
router.get('/', authMiddleware.protect, authMiddleware.adminOnly, orderController.getAllOrders);
router.put('/:id/status', authMiddleware.protect, authMiddleware.adminOnly, orderController.updateOrderStatus);

module.exports = router;