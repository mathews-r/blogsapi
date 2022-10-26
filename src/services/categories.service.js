const { Category } = require('../models');

const newCategoryService = async (name) => {
  await Category.create(name);
};

const getCategoryService = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = { newCategoryService, getCategoryService };