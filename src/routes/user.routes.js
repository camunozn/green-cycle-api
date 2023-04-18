const { Router } = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validator');
const userValidator = require('../validators/user.validator');
const fileUpload = require('express-fileupload')({
  useTempFiles: true,
  tempFileDir: './tmp',
});

const router = Router();

router.post('/signup', authValidator.signupUser, authController.signUp);
router.post('/login', authValidator.loginUser, authController.login);
router.get('/me', authController.protect, userController.getUser);
router.put(
  '/:id',
  userValidator.updateUser,
  authController.protect,
  fileUpload,
  userController.updateUser
);

module.exports = router;
