const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      required: [true, "a comment must have a comment description"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    dish: {
      type: mongoose.Schema.ObjectId,
      ref: "Dish",
      required: [true, "A comment must belong to a particuar dish"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A comment must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name ",
  });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
