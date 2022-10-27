const { newPostService, getPostsService } = require('../services/post.service');

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

module.exports = { newPosts, getPosts };