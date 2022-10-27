const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const newPostService = async (id, { title, content, categoryIds }) => {
  const { dataValues } = await BlogPost.create({
    userId: id,
    title,
    content,
    categoryIds,
  });

  const data = categoryIds.map((categoryId) =>
    PostCategory.create({ postId: dataValues.id, categoryId }));

  await Promise.all(data);

  return dataValues;
};

const getPostsService = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getPostsByIdService = async (id) => {
  const postById = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!postById) {
    return { type: 'error', message: 'Post does not exist' };
  }

  return postById;
};

const updatePostService = async (id, { title, content }, userId) => {
  const [getPosts] = await getPostsService();

  if (getPosts.dataValues.userId === userId) {
    const [postUpdated] = await BlogPost.update(
      {
        title,
        content,
      },
      { where: { id } },
    );
  
    return postUpdated > 0;
  }

  return { type: 'error', message: 'Unauthorized user' };
};

const deletePost = async (id, userId) => {
  const getPost = await getPostsByIdService(id);

  if (getPost.type) { return { status: 404, message: 'Post does not exist' }; }
  if (getPost.userId !== userId) { return { status: 401, message: 'Unauthorized user' }; }

  return { status: 204, message: null };
};

const getByQuery = async (searchTherm, data) => {
  const post = await BlogPost.findAll({
    where: {
      [data]: {
        [Op.like]: `%${searchTherm}%`,
      },
    },
    attributes: { exclude: ['user_id'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

module.exports = {
  newPostService,
  getPostsService,
  getPostsByIdService,
  updatePostService,
  deletePost,
  getByQuery,
};
