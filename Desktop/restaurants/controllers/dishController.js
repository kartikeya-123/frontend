const Dish = require("../models/dishModel.js");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError"); // class//
const factory = require("./handlerFactory.js");

// getting all dishes
exports.getAllDishes = factory.getAll(Dish);

//creating Dish only by the admin
exports.createDish = factory.createOne(Dish);

//getting a certain Dish by all the users
exports.getDish = factory.getOne(Dish, { path: "comments" });

// updating a Dish by only admin//
exports.updateDish = factory.updateOne(Dish);

// deleting a Dish only by the admin
exports.deleteDish = factory.deleteOne(Dish);
