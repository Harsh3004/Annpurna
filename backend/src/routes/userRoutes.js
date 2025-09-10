const express = require('express');
const { sendOtp, signUp, login, changePassword } = require('../controllers/authController');
// const { auth, isStudent, isInstructor, isAdmin } = require('../middlewares/Auth');
const {resetPasswordToken, resetPassword} = require('../controllers/resetPassword');
const router = express.Router();

router.post('/sendOtp', sendOtp);
router.post('/signUp', signUp);
router.post('/login', login);

router.put('/forgotPassword',resetPasswordToken);

module.exports = router;