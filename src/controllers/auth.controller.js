const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const UserServices = require('../services/user.services');
const AuthServices = require('../services/auth.services');

dotenv.config({ path: './config.env' });

exports.signUp = async (req, res, next) => {
  try {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      role_id: req.body.role_id,
    };
    const user = await UserServices.createOne(newUser);
    // incluir envío de mail de confirmación

    const { id, firstname, lastname, email, role_id } = user;
    const token = AuthServices.signToken({
      id,
      firstname,
      lastname,
      email,
      role_id,
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserServices.getOneByEmail(email);
    if (!user)
      return next({
        status: 400,
        message: 'Invalid email',
        errorName: 'User not found',
      });

    const validate = await bcrypt.compare(password, user.password);
    if (!validate)
      return next({
        status: 400,
        message: 'Incorrect password',
        errorName: 'Invalid password',
      });

    const { id, firstname, lastname, role_id } = user;

    const token = AuthServices.signToken({
      id,
      firstname,
      lastname,
      email,
      role_id,
    });

    res.json({
      status: 'success',
      token,
      data: {
        id,
        firstname,
        lastname,
        email,
        role_id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

exports.protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next({
        status: 401,
        error: 'Unauthorized',
        message: 'Not token provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: process.env.JWT_ALGORITHM,
    });
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
  }
};
