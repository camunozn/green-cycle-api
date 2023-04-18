const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');
const orderValidator = require('../validators/order.validator');
const fileUpload = require('express-fileupload')({
  useTempFiles: true,
  tempFileDir: './tmp',
});

const router = Router();
// Routes
//////////////////////////////////////////////////////////////////////////////////////
// Open Orders
router.get('/feed', orderController.getAllAvailableOrders);

//////////////////////////////////////////////////////////////////////////////////////
// Recycler
// View active orders (pending)
router.get('/active', authController.protect, orderController.getAllActiveOrders);
// View closed orders (history)
router.get('/history', authController.protect, orderController.getAllOrdersHistory);
// Create order
router.post(
  '/',
  orderValidator.createOrderRecycler,
  authController.protect,
  orderController.createOrder
);
// Update order
router.put(
  '/:id',
  orderValidator.updateOrderRecycler,
  authController.protect,
  fileUpload,
  orderController.updateOrder
);
// Delete order
router.delete(
  '/:id',
  orderValidator.deleteOrderRecycler,
  authController.protect,
  orderController.deleteOrder
);

//////////////////////////////////////////////////////////////////////////////////////
// Collector
// View available orders (pending)
router.get('/available', authController.protect, orderController.getAllAvailableOrders);
// View attending orders (assigned)
router.get('/attending', authController.protect, orderController.getAllAttendingOrders);
// View attended orders (closed)
router.get('/attended', authController.protect, orderController.getAllAttendedOrders);
// Attend an order
router.put(
  '/:id/attend',
  orderValidator.updateOrderCollector,
  authController.protect,
  orderController.attendOrder
);
// Dismiss an order
router.put(
  '/:id/dismiss',
  orderValidator.updateOrderCollector,
  authController.protect,
  orderController.dismissOrder
);
// Close an order
router.put(
  '/:id/close',
  orderValidator.updateOrderCollector,
  authController.protect,
  orderController.closeOrder
);

module.exports = router;
