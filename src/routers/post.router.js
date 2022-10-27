const express = require('express');
const postController = require('../controllers/post.controller');
const { postValidations, categoryValidation } = require('../middlewares/postValidation');
const { tokenValidation } = require('../middlewares/tokenValidation');

const postRouter = express.Router();

postRouter.get('/', tokenValidation, postController.getPosts);

postRouter.post('/', tokenValidation, postValidations, categoryValidation, postController.newPosts);

module.exports = postRouter;