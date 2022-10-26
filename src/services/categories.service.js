const { Category } = require('../models');

const newCategoryService = async (name) => {
  await Category.create(name);
};

module.exports = { newCategoryService };