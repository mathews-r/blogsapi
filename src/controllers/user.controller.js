const { newUserService, getUsersService } = require('../services/user.service');

const newUser = async (req, res) => {
  const data = req.body;

  const { type, message } = await newUserService(data);
  
  if (type) {
    return res.status(409).json({ message });
  }

  return res.status(201).json({ token: message });
};

const getUsers = async (_req, res) => {
  const result = await getUsersService();

  return res.status(200).json(result);
};

module.exports = { newUser, getUsers };