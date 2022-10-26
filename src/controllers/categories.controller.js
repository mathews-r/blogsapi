const { newCategoryService } = require('../services/categories.service');

const newCategory = async (req, res) => {
  const { name } = req.body;
  console.log(name);

  await newCategoryService(name);

  res.status(201).json({ name });
};

module.exports = { newCategory };