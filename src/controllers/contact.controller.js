const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


module.exports = {
  getFormData: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.errors.map(error => error.msg) });
      }

      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });
        const mailOption = {
          from: req.body.email,
          name: req.body.name,
          to: process.env.EMAIL_USER,
          subject: `Mensaje de ${req.body.name}: [${req.body.subject}]`,
          text: `Ha llegado un mensaje de ${req.body.email}: ${req.body.message}`,
        };

        const info = await transporter.sendMail(mailOption);
        
        res.status(200).json('¡Gracias por contactarnos! Pronto nos pondremos en contacto con usted.');
      } catch (error) {
        console.error(error);
        res.status(500).json('Algo salió mal. Por favor, inténtelo de nuevo más tarde.');
      }
    }
};




