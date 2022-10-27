const { BlogPost, PostCategory, User, Category } = require('../models');

const newPostService = async (id, { title, content, categoryIds }) => {
  const { dataValues } = await BlogPost.create({ userId: id, title, content, categoryIds });

  const data = categoryIds.map((categoryId) => PostCategory
    .create({ postId: dataValues.id, categoryId }));

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

module.exports = { newPostService, getPostsService, getPostsByIdService };
