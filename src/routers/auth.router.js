const express = require('express');

const authController = require('../controllers/auth.controller');
const { loginValidation } = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/', loginValidation, authController.login);

module.exports = router;