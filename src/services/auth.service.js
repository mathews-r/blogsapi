const { User } = require('../models');
const jwtUtil = require('../utils/jwt.utils');

const validateLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (user === null || user.password !== password) {
    return { type: 'erro', message: 'Invalid fields' };
  }
  
  const token = jwtUtil.createToken(email);

  return token;
};

module.exports = {
  validateLogin,
};