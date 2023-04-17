const jwt = require('jsonwebtoken');

class AuthServices {
  static signToken(payload) {
    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;