const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
const userRouter = require('./routes/userRoutes.js');
const postRouter = require('./routes/postRoutes.js');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

// user route : /v1/users
// post route : /v1/posts
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  console.log('in development');
  app.use(morgan('dev'));
}
if (process.env.NODE_ENV === 'production') {
  console.log('in production mode');
}
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.use('*', (req, res, next) => {
  res.end('error');
});

module.exports = app;
