const { check, param } = require('express-validator');
const validateResult = require('../utils/validate');

exports.updateUser = [
  param('id').isInt().withMessage('El id debe ser un numero entero'),
  check('firstname', 'Error en el campo firstname')
    .exists()
    .withMessage("Debe existir la propiedad 'firstname'")
    .notEmpty()
    .withMessage('El campo no debe estar vacio')
    .isString()
    .withMessage('El campo debe ser un string'),

  check('lastname', 'Error en el campo lastname')
    .exists()
    .withMessage("Debe existir la propiedad 'lastname'")
    .notEmpty()
    .withMessage('El campo no debe estar vacio')
    .isInt()
    .withMessage('El campo debe ser un entero'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
