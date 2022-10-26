const express = require('express');
const { newCategory, getCategories } = require('../controllers/categories.controller');
const { nameValidation } = require('../middlewares/categoryValidation');
const { tokenValidation } = require('../middlewares/tokenValidation');

const categoryRouter = express.Router();

categoryRouter.post('/', tokenValidation, nameValidation, newCategory);
categoryRouter.get('/', tokenValidation, getCategories);

module.exports = categoryRouter;