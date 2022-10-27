const postValidations = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
     return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const categoryValidation = async (req, res, next) => {
  const { categoryIds } = req.body;

  const verifyCategory = categoryIds.some((category) => category > 2);

  if (verifyCategory === true) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  next();
};

const bodyValidation = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = { postValidations, categoryValidation, bodyValidation };