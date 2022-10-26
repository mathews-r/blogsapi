const express = require('express');
const userController = require('../controllers/user.controller');
const { displayValidation,
  emailValidation, passwordValidation } = require('../middlewares/userValidation');

const userRouter = express.Router();

userRouter.post('/', displayValidation,
emailValidation, passwordValidation, userController.newUser);

module.exports = userRouter;