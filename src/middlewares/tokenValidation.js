const jwt = require('jsonwebtoken');

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    const e = res.status(401).json({ message: 'Expired or invalid token' });
    throw e;
  }
};

module.exports = { tokenValidation };
