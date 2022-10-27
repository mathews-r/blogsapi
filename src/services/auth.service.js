const { User } = require('../models');
const jwtUtil = require('../utils/jwt.utils');

const validateLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { type: 'error', message: 'Invalid fields' };
  }
  
  const token = jwtUtil.createToken(email, user.id);

  return token;
};

module.exports = {
  validateLogin,

};