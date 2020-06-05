const User = require('./../models/userModel.js');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError'); // class//
const { promisify } = require('util');
const mongoose = require('mongoose');
const sendEmail = require('../utils/email');
const bcrypt = require('bcryptjs');
const Token = require('./../models/tokenModel.js');
// preparing a token
const createToken = (id) => {
  const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return jwtToken;
};

//sending a token

const createSendToken = (user, statusCode, res) => {
  const token = createToken(user._id);
  // not showing the password while signup//
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// signup
exports.signup = catchAsync(async (req, res, next) => {
  // checking if the two tokens are sent
  if (!req.params.token) {
    return next(new AppError('sorry cannot create an account', 403));
  }

  // verifying the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const token = await Token.findOne({
    hashedToken: hashedToken,
    tokenExpiresAt: { $gt: Date.now() },
  });
  if (!token) {
    return next(new AppError('There is a problem', 404));
  }

  // we can now create a account and send a jwt//
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // sending a jwt
  createSendToken(newUser, 201, res);
  next();
});

exports.verificationEmail = catchAsync(async (req, res, next) => {
  //1 check if the email is present
  if (!req.body.email) {
    return next(new AppError('please mention your email id', 404));
  }

  // creating a random token using the email id //
  const token = crypto.randomBytes(32).toString('hex');

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const t = await Token.create({
    hashedToken: hashedToken,
    tokenExpiresAt: Date.now() + 10 * 60 * 1000,
  });

  const emailVerify = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/signup/${token}`;

  const verify_message = `Hey user to signup , there is one step more , click the link : ${emailVerify}`;

  try {
    //sending email to the given email
    await sendEmail({
      email: req.body.email,
      subject: 'signup verification email',
      text: verify_message,
    });

    res.status(200).json({
      status: 'success',
      message: 'verification email sent successfully',
    });
  } catch (err) {
    return next(new AppError('problem in sending the email', 500));
  }
});
