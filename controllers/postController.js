const Post = require('../models/postModel.js');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError'); // class//
const factory = require('./handlerFactory.js');

// getting all posts
exports.getAllPosts = factory.getAll(Post);

//creating post
exports.createPost = factory.createOne(Post);

//getting a certain post

exports.getPost = factory.getOne(Post);

// updating a post by only admin//

exports.updatePost = factory.updateOne(Post);

// a user can delete his posts//

exports.deletePost = factory.deleteOne(Post);

exports.BlacklistPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).select('+Blacklist');
  if (!post) {
    return next(new AppError('there is no post with this id', 400));
  }

  if (!post.Blacklist) {
    post.Blacklist = true;
    await post.save({ runValidators: false });
    res.status(200).json({
      status: 'success',
      message: 'post has been successfully blacklisted by the admin',
    });
  }
});

exports.upvotePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).select('upvotes');
  if (!post) {
    return next(new AppError('there is no post with this id', 400));
  }
  var i;
  for (i = 0; i < post.upvotedBy.length; i++) {
    if (post.upvotedBy[i]._id == req.user.id) {
      return next(new AppError('post already upvoted', 400));
    }
  }

  for (i = 0; i < post.downvotedBy.length; i++) {
    if (post.downvotedBy[i]._id == req.user.id) {
      post.downvotedBy.splice(i, 1);
    }
  }
  post.downvotes = post.downvotedBy.length;
  post.upvotedBy.push(req.user.id);
  post.upvotes = post.upvotedBy.length;
  await post.save({ runValidators: false });
  res.status(200).json({
    status: 'success',
    message: 'post upvoted',
  });
});

exports.downvotePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError('there is no post with this id', 400));
  }
  var i;
  for (i = 0; i < post.downvotedBy.length; i++) {
    if (post.downvotedBy[i]._id == req.user.id) {
      return next(new AppError('post already downvoted', 400));
    }
  }

  for (i = 0; i < post.upvotedBy.length; i++) {
    if (post.upvotedBy[i]._id == req.user.id) {
      post.upvotedBy.splice(i, 1);
    }
  }
  post.downvotedBy.push(req.user.id);

  post.downvotes = post.downvotedBy.length;
  post.upvotes = post.upvotedBy.length;
  await post.save({ runValidators: false });
  res.status(200).json({
    status: 'success',
    message: 'post downvoted',
  });
});

exports.checkBlacklist = factory.checkBlacklist(Post);
