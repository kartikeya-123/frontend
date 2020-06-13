const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the dish should be mentioned"],
    },
    slug: String,
    Price: {
      type: String,
      required: [true, "A dish should have a price"],
    },
    Chef: {
      type: String,
    },
    image: String,
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

dishSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "dish",
  localField: "_id",
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
