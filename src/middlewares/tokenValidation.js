const tokenValidation = async (req, res, next) => {
  const { Authorization } = req.headers;

  if (!Authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  if (Authorization) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = { tokenValidation };