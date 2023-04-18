const { check, param } = require('express-validator');
const validateResult = require('../utils/validate');

exports.createOrderRecycler = [
  check('volumen', 'Error en el campo volumen')
    .exists()
    .withMessage("Debe existir la propiedad 'volumen'")
    .notEmpty()
    .withMessage('El campo no debe estar vacío')
    .isString()
    .withMessage('El campo debe ser un string'),

  check('material_id', 'Error en el campo material_id')
    .exists()
    .withMessage("Debe existir la propiedad 'material_id'")
    .notEmpty()
    .withMessage('El campo no debe estar vacío')
    .isInt()
    .withMessage('El campo debe ser un entero'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

exports.updateOrderRecycler = [
  param('id').isInt().withMessage('El id debe ser un entero'),
  check('volumen', 'Error en el campo volumen')
    .exists()
    .withMessage("Debe existir la propiedad 'volumen'")
    .notEmpty()
    .withMessage('El campo no debe estar vacío')
    .isString()
    .withMessage('El campo debe ser un string'),

  check('material_id', 'Error en el campo material_id')
    .exists()
    .withMessage("Debe existir la propiedad 'material_id'")
    .notEmpty()
    .withMessage('El campo no debe estar vacío')
    .isInt()
    .withMessage('El campo debe ser un entero'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

exports.deleteOrderRecycler = [
  param('id').isInt().withMessage('El id debe ser un entero'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

exports.updateOrderCollector = [
  param('id').isInt().withMessage('El id debe ser un entero'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
