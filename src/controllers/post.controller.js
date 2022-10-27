const { newPostService,
  getPostsService, getPostsByIdService } = require('../services/post.service');

const newPosts = async (req, res) => {
  const data = req.body;
  const { id } = req.user;

  const result = await newPostService(id, data);
  
  if (result) {
    return res.status(201).json(result);
  }
};

const getPosts = async (_req, res) => {
  const posts = await getPostsService();

  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  
  const postById = await getPostsByIdService(id);

  if (postById.type) {
    return res.status(404).json({ message: postById.message });
  } 
  return res.status(200).json(postById);
};

module.exports = { newPosts, getPosts, getPostById };