const { check } = require("express-validator");

exports.signupUser = [
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

    check('email', 'Error en el campo email')
        .exists()
        .withMessage("Debe existir la propiedad 'email'")
        .notEmpty()
        .withMessage('El campo no debe estar vacio')
        .isEmail()
        .withMessage('El campo debe tener formato de email'),

    check('password', 'Error en el campo password')
        .exists()
        .withMessage("Debe existir la propiedad 'password'")
        .notEmpty()
        .withMessage('El campo no debe estar vacio')
        .isStrongPassword()
        .withMessage('El campo debe tener formato de password'),

    check('role_id')
        .notEmpty()
        .withMessage('El campo no debe estar vacio'),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

exports.loginUser = [
    check('email', 'Error en el campo email')
        .exists()
        .withMessage("Debe existir la propiedad 'email'")
        .notEmpty()
        .withMessage('El campo no debe estar vacio')
        .isEmail()
        .withMessage('El campo debe tener formato de email'),

    check('password', 'Error en el campo password')
        .exists()
        .withMessage("Debe existir la propiedad 'password'")
        .notEmpty()
        .withMessage('El campo no debe estar vacio')
        .isStrongPassword()
        .withMessage('El campo debe tener formato de password'),

    (req, res, next) => {
        validateResult(req, res, next);
    },
]; 