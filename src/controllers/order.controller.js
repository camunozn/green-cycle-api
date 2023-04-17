const OrderServices = require('../services/order.services');
const fs = require('fs/promises');
/////////////////////////////////////////////////////
// Recycler

exports.getAllActiveOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;

    // Verificar que el rol del usuario sea reciclador
    if (role === 1) {
      const activeOrders = await OrderServices.getActiveOrders(userId);
      res.status(200).json({
        status: 'success',
        orders: activeOrders,
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getAllOrdersHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;

    // Verificar que el rol del usuario sea reciclador
    if (role === 1) {
      const ordersHistory = await OrderServices.getOrdersHistory(userId);
      res.status(200).json({
        status: 'success',
        orders: ordersHistory,
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;
    const newOrder = req.body;

    // Verificar que el rol del usuario sea reciclador
    if (role === 1) {
      const orderCreated = await OrderServices.createOrder(userId, newOrder);
      res.status(200).json({
        status: 'success',
        orderCreated,
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  
    const role = req.user.role_id;
    const {
      volumen,
      weight,
      observations,
      material_id,
    } = req.body;
    let { image } = req.files || {}

    try {
      const imageUpload = await OrderServices.uploadImageOrder(image.tempFilePath)

      const { secure_url: url, public_id: idImg } = imageUpload;

      image = url;
      const image_id = idImg;

      await fs.rmdir('./tmp', { recursive: true })

    // Verificar que el rol del usuario sea reciclador
    // Verificar que el usuario que borra la orden sea el que la creó
    if (role === 1) {
      const orderId = req.params.id;
      const orderUpdated = await OrderServices.updateOrder(orderId, {
        volumen,
        weight,
        observations,
        material_id,
        image_id, 
        image
      });
      res.status(201).json({
        status: 'success',
        message: 'Order updated successfully',
        orderUpdated,
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    if (image !== undefined && typeof image === 'string') {
    await OrderServices.deleteImageOrder(image_id)
    }
    console.error(error);
    res.status(500).json(error)
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const role = req.user.role_id;
    const orderId = req.params.id;

    //TODO Realizar middleware de restricción de usuario.
    // Verificar que el usuario que borra la orden sea el que la creó
    // Verificar que el rol del usuario sea reciclador
    if (role === 1) {
      await OrderServices.deleteOrder(orderId);
      res.status(204).json({
        status: 'success',
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

/////////////////////////////////////////////////////////////////
// Collector

exports.getAllAvailableOrders = async (req, res, next) => {
  try {
    const role = req.user.role_id;

    // Verificar que el rol del usuario sea recolector
    if (role === 2) {
      const availableOrders = await OrderServices.getAvailableOrders();
      res.status(200).json({
        status: 'success',
        orders: availableOrders,
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getAllAttendingOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;

    // Verificar que el rol del usuario sea recolector
    if (role === 2) {
      const attendingOrders = await OrderServices.getAttendingOrders(userId);
      res.status(200).json({
        status: 'success',
        orders: attendingOrders,
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.getAllAttendedOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;

    // Verificar que el rol del usuario sea recolector
    if (role === 2) {
      const attendedOrders = await OrderServices.getAttendedOrders(userId);
      res.status(200).json({
        status: 'success',
        orders: attendedOrders,
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.attendOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;
    const orderId = req.params.id;

    // Verificar que el rol del usuario sea recolector
    // Se debería validar que la orden esté pendiente para poder atenderla
    if (role === 2) {
      const status = 'asignado';
      await OrderServices.assignCollectorToOrder(orderId, userId);
      const order = await OrderServices.updateOrderStatus(orderId, status);
      res.status(200).json({
        status: 'success',
        data: {
          order,
        },
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.dismissOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const role = req.user.role_id;
    const orderId = req.params.id;

    // Verificar que el rol del usuario sea recolector
    // Verificar que el recolectar que modifica la orden sea que está asignado
    // Se debería validar que la orden esté asignada para poder descartar
    if (role === 2) {
      const status = 'pendiente';
      await OrderServices.unassignCollectorToOrder(orderId, userId);
      const order = await OrderServices.updateOrderStatus(orderId, status);
      res.status(200).json({
        status: 'success',
        data: {
          order,
        },
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.closeOrder = async (req, res, next) => {
  try {
    const role = req.user.role_id;
    const orderId = req.params.id;

    // Verificar que el rol del usuario sea recolector
    // Verificar que el recolectar que modifica la orden sea que está asignado
    // Se debería verificar que la orden está asignada para poder cerrarla
    if (role === 2) {
      const status = 'entregado';
      const order = await OrderServices.updateOrderStatus(orderId, status);
      res.status(200).json({
        status: 'success',
        data: {
          order,
        },
      });
    } else {
      res.status(401).json({
        errorName: 'Unauthorized',
        errorMessage: 'Access denied for this user role',
      });
    }
  } catch (error) {
    console.error(error);
  }
};
