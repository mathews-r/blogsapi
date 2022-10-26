const { newCategoryService, getCategoryService } = require('../services/categories.service');

const newCategory = async (req, res) => {
  const { name } = req.body;

  await newCategoryService(name);

  return res.status(201).json({ name });
};

const getCategories = async (_req, res) => {
  const result = await getCategoryService();

  return res.status(200).json(result);
};

module.exports = { newCategory, getCategories };