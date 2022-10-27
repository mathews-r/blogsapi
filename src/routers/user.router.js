const express = require('express');
const userController = require('../controllers/user.controller');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { displayValidation,
  emailValidation, passwordValidation } = require('../middlewares/userValidation');

const userRouter = express.Router();

userRouter.post('/', displayValidation,
emailValidation, passwordValidation, userController.newUser);

userRouter.get('/', tokenValidation, userController.getUsers);
userRouter.get('/:id', tokenValidation, userController.getUserById);

userRouter.delete('/me', tokenValidation, userController.deleteUser);

module.exports = userRouter;