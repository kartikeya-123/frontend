const Post = require('../models/postModel.js');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError'); // class//

// getting all posts
exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    status: 'success',
    data: {
      data: posts,
    },
  });
});

//creating post
exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newPost,
    },
  });
});

//getting a certain post

exports.getPost = catchAsync(async (req, res, next) => {
  const post = Post.findById(req.params.id);
  if (!post) {
    return next(new AppError('there is no post with this id', 403));
  }
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

// updating a post by only admin//

exports.updatePost = catchAsync(async (req, res, next) => {
  const doc = Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // shows the new updated post//
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('there is no post with this id', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: post,
    },
  });
});

// a user can delete his posts//
exports.deletePost = catchAsync(async (rea, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('there is no post with this id', 403));
  }
  // if(req.user.id !== post.User._id){
  //   return next (new AppError('Sorry you are not the owner of this post',403));
  // }
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
