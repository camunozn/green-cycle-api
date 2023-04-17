const Users = require('../models/user.model');
const cloudinary = require('../config/clodinary-config')
class UserServices {
  static async getAll() {
    try {
      return await Users.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getUser(userId) {
    try {
      return await Users.findOne({
        where: { id: userId },
      });
    } catch (error) {
      throw error.message;
    }
  }

  static async getOneByEmail(email) {
    try {
      return await Users.findOne({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createOne(newUser) {
    try {
      return await Users.create(newUser);
    } catch (error) {
      throw error.message;
    }
  }

  static async updateOne(id, data) {
    try {
      return await Users.update(data, {
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  static async uploadImage (filePath) {
    return await cloudinary.uploader.upload(filePath, {
      /* Creating a folder in the cloudinary account. */
      folder: 'greeCycle_users'
    })
  }

  static async deleteImage (id) {
    return await cloudinary.uploader.destroy(id)
  }

}

module.exports = UserServices;