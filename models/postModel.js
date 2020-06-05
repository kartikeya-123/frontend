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
    upvoted: {
      type:mongoose.Schema.ObjectId,
      ref:'User'
    },
    downVoted: {
      type:mongoose.Schema.ObjectId,
      ref:'User'
    }
   
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    blacklist: {
      type: Boolean,
      default: false,
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