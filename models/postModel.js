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
    upvotes: Number,
    downVotes: Number,
    rating_Average: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (value) => Math.round(value * 10) / 10,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    whitelist: {
      type: Boolean,
      default: true,
    },
    User:{
      type:mongoose.Schema.ObjectId,
      ref:'User',
      required:[true,'a post must belong to a user']
    }
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// populating the user for every post
postSchema.pre(/^find/,function(next){
  this.populate({
    path: 'user',
    select: 'name '
  });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
