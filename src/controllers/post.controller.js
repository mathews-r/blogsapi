const {
  newPostService,
  getPostsService,
  getPostsByIdService,
  updatePostService,
  deletePost,
  getByQuery,
} = require('../services/post.service');

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

const updatePost = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { id: userId } = req.user;

  const update = await updatePostService(id, data, userId);
  const updatedPost = await getPostsByIdService(id);

  if (update.type) {
    return res.status(401).json({ message: update.message });
  }

  return res.status(200).json(updatedPost);
};

const removePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const remove = await deletePost(id, userId);

  return res.status(remove.status).json({ message: remove.message });
};

const getPostByQuery = async (req, res) => {
  const { q } = req.query;
  const posts = await getByQuery(q, 'content');

  return res.status(200).json(posts);
};

module.exports = { newPosts, getPosts, getPostById, updatePost, removePost, getPostByQuery };
