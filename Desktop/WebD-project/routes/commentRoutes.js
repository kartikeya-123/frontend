const express = require("express");

const authController = require("./../controllers/authController.js");
const commentController = require("./../controllers/commentController.js");

const router = express.Router({ mergeParams: true });

router.route("/").get(commentController.getAllComments);
router.use(authController.protect);

router
  .route("/")

  .post(
    authController.restrictTo("user"),
    commentController.setDishUserIds,
    commentController.createComment
  ); // only users can create comment
router
  .route("/:id")
  .delete(authController.restrictTo("user"), commentController.deleteComment)
  .patch(authController.restrictTo("user"), commentController.updateComment)
  .get(commentController.getComment);

module.exports = router;
