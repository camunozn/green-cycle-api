const { check, param } = require('express-validator');
const validateResult = require('../utils/validate');

exports.updateUser = [
  param('id').isInt().withMessage('El id debe ser un numero entero'),
  check('username', 'Error con el campo username')
    .exists()
    .withMessage("Debe existir la propiedad 'username'")
    .notEmpty()
    .withMessage('El username no debe estar vacio')
    .isString()
    .withMessage('El username debe ser un string')
    .isLength({ min: 6, max: 30 })
    .withMessage('El username debe tener entre 6 y 30 caracteres'),
  check('avatar', 'Error con el campo avatar')
    .notEmpty()
    .withMessage('El avatar no debe estar vacio')
    .isURL()
    .withMessage('el avatar debe ser una URL valida'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];