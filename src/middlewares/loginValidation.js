const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Some required fields are missing' });
  }
  if (email.length === 0 || password.length === 0) {
    res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

module.exports = {
  loginValidation,
};
