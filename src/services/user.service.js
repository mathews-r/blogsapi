const { User } = require('../models');
const jwUtil = require('../utils/jwt.utils');

const newUserService = async ({ displayName, email, password, image }) => {
  const users = await User.findOne({ where: { email } });
  if (users) {
    return { type: 'error', message: 'User already registered' };
  }

  await User.create({ displayName, email, password, image });

  const token = jwUtil.createToken(email);

  return { type: null, message: token };
};

const getUsersService = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getUserByIdService = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: 'password' },
  });
  return user;
};

module.exports = { newUserService, getUsersService, getUserByIdService };