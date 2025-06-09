const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateOrder } = require('../validators/orderValidator');
const validateRequest = require('../middleware/validateRequest');
const checkStock = require('../middleware/checkStock');

// Ordenes
router.post('/create', verifyToken, validateOrder, validateRequest, checkStock, createOrder);
router.get('/user', verifyToken, getUserOrders);
router.get('/all', verifyToken, isAdmin, getAllOrders);
router.put('/update/:id', verifyToken, isAdmin, updateOrderStatus);
router.put('/cancel/:id', verifyToken, cancelOrder);

module.exports = router;