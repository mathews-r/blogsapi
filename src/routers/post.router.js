const express = require('express');
const postController = require('../controllers/post.controller');
const { postValidations, categoryValidation } = require('../middlewares/postValidation');
const { tokenValidation } = require('../middlewares/tokenValidation');

const postRouter = express.Router();

postRouter.get('/', tokenValidation, postController.getPosts);
postRouter.get('/:id', tokenValidation, postController.getPostById);

postRouter.post('/', tokenValidation, postValidations, categoryValidation, postController.newPosts);

module.exports = postRouter;