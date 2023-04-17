const { Op } = require('sequelize');
const Orders = require('../models/order.model');
const OrderUsers = require('../models/orderUsers.model');
const cloudinary = require('../config/clodinary-config')

class OrderServices {
  static async getActiveOrders(userId) {
    try {
      return await Orders.findAll({
        where: { recycler_id: userId, status: { [Op.not]: 'entregado' } },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getOrdersHistory(userId) {
    try {
      return await Orders.findAll({ where: { recycler_id: userId, status: 'entregado' } });
    } catch (error) {
      throw error;
    }
  }

  static async getAvailableOrders() {
    try {
      return await Orders.findAll({ where: { status: 'pendiente' } });
    } catch (error) {
      throw error;
    }
  }

  static async getAttendingOrders(userId) {
    try {
      return await OrderUsers.findAll({
        where: { collector_id: userId },
        include: { model: Orders, where: { status: 'asignado' } },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAttendedOrders(userId) {
    try {
      return await OrderUsers.findAll({
        where: { collector_id: userId },
        include: { model: Orders, where: { status: 'entregado' } },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createOrder(recycler_id, newOrder) {
    try {
      return await Orders.create({
        volumen: newOrder.volumen,
        weight: newOrder.weight,
        observations: newOrder.observations,
        material_id: newOrder.material_id,
        recycler_id,
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(id, order) {
    try {
      return await Orders.update( order,
        {
          where: {
            id,
            status: 'pendiente',
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrder(id) {
    try {
      return await Orders.destroy({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderStatus(id, status) {
    try {
      return await Orders.update(
        { status },
        {
          where: { id },
          include: {
            model: OrderUsers,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }
  static async assignCollectorToOrder(orderId, userId) {
    try {
      return await OrderUsers.create({
        order_id: orderId,
        collector_id: userId,
      });
    } catch (error) {
      throw error;
    }
  }
  static async unassignCollectorToOrder(orderId) {
    try {
      return await OrderUsers.destroy({
        where: { order_id: orderId },
      });
    } catch (error) {
      throw error;
    }
  }

  static async uploadImageOrder (filePath) {
    return await cloudinary.uploader.upload(filePath, {
      /* Creating a folder in the cloudinary account. */
      folder: 'greeCycle_orders'
    })
  }

  static async deleteImageOrder (id) {
    return await cloudinary.uploader.destroy(id)
  }

}
module.exports = OrderServices;
