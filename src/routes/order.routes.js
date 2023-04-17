const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');
const { or } = require('sequelize');
const fileUpload = require('express-fileupload')({
  useTempFiles: true,
  tempFileDir: './tmp'
})

const router = Router();
// Routes
//////////////////////////////////////////////////////////////////////////////////////
// Open Orders
// router.get('/feed', orderController.getAllOpenOrders);

//////////////////////////////////////////////////////////////////////////////////////
// Recycler
// View active orders (pending)
router.get('/active', authController.protect, orderController.getAllActiveOrders);
// View closed orders (history)
router.get('/history', authController.protect, orderController.getAllOrdersHistory);
// Create order
router.post('/', authController.protect, orderController.createOrder);
// Update order
router.put('/:id', authController.protect, fileUpload, orderController.updateOrder);
// Delete order
router.delete('/:id', authController.protect, orderController.deleteOrder);

//////////////////////////////////////////////////////////////////////////////////////
// Collector
// View available orders (pending)
router.get('/available', orderController.getAllAvailableOrders);
// View attending orders (assigned)
router.get('/attending', authController.protect, orderController.getAllAttendingOrders);
// View attended orders (closed)
router.get('/attended', authController.protect, orderController.getAllAttendedOrders);
// Attend an order
router.put('/:id/attend', authController.protect, orderController.attendOrder);
// Dismiss an order
router.put('/:id/dismiss', authController.protect, orderController.dismissOrder);
// Close an order
router.put('/:id/close', authController.protect, orderController.closeOrder);

module.exports = router;
