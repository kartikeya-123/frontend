const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
const userRouter = require('./routes/userRoutes.js');
const postRouter = require('./routes/postRoutes.js');

// user route : /v1/users
// post route : /v1/posts

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.use('*', (req, res, next) => {
  res.end('error');
});

module.exports = app;
