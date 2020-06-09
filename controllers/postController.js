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
    return nect(new AppError('there is no post with this id', 400));
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

exports.checkBlacklist = factory.checkBlacklist(Post);
