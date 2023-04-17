const { check } = require('express-validator');
const validateResult = require('../utils/validate');


exports.createOrderRecycler = [
    check('volumen', 'Error en el campo volumen')
        .exists()
        .withMessage("Debe existir la propiedad 'volumen'")
        .notEmpty()
        .withMessage('El campo no debe estar vacio')
        .isString()
        .withMessage('El campo debe ser un string'),

    check('weight', 'Error en el campo peso')
        .exists()
        .withMessage("Debe existir la propiedad 'volumen'")
        .notEmpty()
        .withMessage('El campo no debe estar vacio')
        .isInt()
        .withMessage('El campo debe ser un entero'),

    check('observations', 'Error en el campo observaciones')
        .exists()
        .withMessage("Debe existir la propiedad 'observations'")
        .notEmpty()
        .withMessage('El campo no debe estar vacio')
        .isInt()
        .withMessage('El campo debe ser un entero')
        .isLength({ min: 6, max: 200 })
        .withMessage('El campo debe tener entre 6 y 200'),

    check('material_id')
        .notEmpty()
        .withMessage('El campo no debe estar vacio'),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

exports.updateOrderRecycler = [
    param('id').isInt().withMessage('El id debe ser de digitos enteros'),
    check('volumen', 'Error en el campo volumen')
        .exists()
        .withMessage("Debe existir la propiedad 'volumen'")
        .notEmpty()
        .withMessage('El campo no debe estar vacio')
        .isString()
        .withMessage('El campo debe ser un string'),

    check('weight', 'Error en el campo peso')
        .exists()
        .withMessage("Debe existir la propiedad 'volumen'")
        .notEmpty()
        .withMessage('El campo no debe estar vacio')
        .isInt()
        .withMessage('El campo debe ser un entero'),

    check('observations', 'Error en el campo observaciones')
        .exists()
        .withMessage("Debe existir la propiedad 'observations'")
        .notEmpty()
        .withMessage('El campo no debe estar vacio')
        .isInt()
        .withMessage('El campo debe ser un entero')
        .isLength({ min: 6, max: 200 })
        .withMessage('El campo debe tener entre 6 y 200'),

    check('material_id')
        .notEmpty()
        .withMessage('El campo no debe estar vacio'),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

exports.updateOrderRecolector = [
    param('id').isInt().withMessage('El id debe ser de digitos enteros'),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

