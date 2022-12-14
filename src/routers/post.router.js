const express = require('express');
const postController = require('../controllers/post.controller');
const { postValidations,
   categoryValidation, bodyValidation } = require('../middlewares/postValidation');
const { tokenValidation } = require('../middlewares/tokenValidation');

const postRouter = express.Router();

postRouter.get('/search', tokenValidation, postController.getPostByQuery);
postRouter.get('/', tokenValidation, postController.getPosts);

postRouter.get('/:id', tokenValidation, postController.getPostById);

postRouter.post('/', tokenValidation, postValidations, categoryValidation, postController.newPosts);

postRouter.put('/:id', bodyValidation, tokenValidation, postController.updatePost);

postRouter.delete('/:id', tokenValidation, postController.removePost);

module.exports = postRouter;