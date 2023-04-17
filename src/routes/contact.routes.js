const { Router } = require('express');
const { body } = require('express-validator');
const contactController = require('../controllers/contact.controller');

const router = Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio.'),
    body('subject').trim().notEmpty().withMessage('El asunto es obligatorio.'),
    body('email').trim().isEmail().withMessage('El email es inválido.'),
    body('message').trim().notEmpty().withMessage('El mensaje es obligatorio.'),
  ],
  contactController.getFormData
);

module.exports = router;