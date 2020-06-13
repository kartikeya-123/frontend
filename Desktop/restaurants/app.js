const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const app = express();
const userRouter = require("./routes/userRoutes.js");
const dishRouter = require("./routes/dishRoutes.js");

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRouter);
app.use("/api/v1/dishes", dishRouter);

app.use("*", (req, res, next) => {
  res.end("error");
});

module.exports = app;
