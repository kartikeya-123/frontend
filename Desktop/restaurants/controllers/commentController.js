const Comment = require("./../models/commentModel.js");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory.js");

exports.getAllComments = factory.getAll(Comment);

exports.setDishUserIds = (req, res, next) => {
  if (!req.body.dish) req.body.dish = req.params.dishId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);

exports.deleteComment = factory.deleteOne(Comment);
exports.updateComment = factory.updateOne(Comment);
