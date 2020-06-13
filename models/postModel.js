const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must contain a title'],
    },
    slug: String,
    author: {
      type: String,
      required: [true, 'A post should have author'],
    },
    body: {
      type: String,
      required: [true, 'A post should contain info'],
      trim: true,
    },
    upvotedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    downvotedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    Blacklist: {
      type: Boolean,
      default: false,
    },
    users: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// populating the user for every post
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'upvotedBy',
    select: 'name',
  }).populate({
    path: 'downvotedBy',
    select: 'name',
  });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
