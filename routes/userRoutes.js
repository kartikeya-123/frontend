const express = require('express');
const authController = require('./../controllers/authController');
const router = express.Router();
// const userController = require('./../controllers/authController');

router.post('/signup', authController.verificationEmail);
router.post('/signup/:token', authController.signup);

module.exports = router;
