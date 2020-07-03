const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');
const factory = require('./../controllers/handlerFactory');
const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

router.patch(
  '/blacklist/:id',
  authController.protect,
  authController.restrictTo('admin'),
  postController.BlacklistPost
);
router.patch('/upvote/:id', authController.protect, postController.upvotePost);
router.patch(
  '/downvote/:id',
  authController.protect,
  postController.downvotePost
);
router.get('/my-posts', authController.protect, postController.getPostsOfUser);
router
  .route('/:id')
  .get(postController.checkBlacklist, postController.getPost)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    factory.checkBlacklist,
    postController.updatePost
  )
  .post(
    authController.protect,
    // authController.restrictTo('admin'),
    postController.restrict,
    postController.deletePost
  );
module.exports = router;
