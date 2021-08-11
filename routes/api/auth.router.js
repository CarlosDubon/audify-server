const express = require('express');
const router = express.Router();

const authController = require('@app/controllers/auth.controller');

const runValidation = require('@app/validators');
const { 
  loginValidator, registerValidator, forgotPasswordValidator, passwordRecoveryValidator
} = require('@app/validators/auth.validators');

//Routes go here
router.post("/signup", registerValidator, runValidation, authController.register);
router.post("/signin", loginValidator, runValidation, authController.login);
router.post("/forgot-password", forgotPasswordValidator, runValidation, authController.forgotPassword);
router.post("/password-recovery", passwordRecoveryValidator, runValidation, authController.passwordRecovery);

module.exports = router;