const { newUserService,
  getUsersService, getUserByIdService, deleteMe } = require('../services/user.service');

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

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await getUserByIdService(id);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;

  await deleteMe(id);
  return res.status(204).json(); 
};

module.exports = { newUser, getUsers, getUserById, deleteUser };