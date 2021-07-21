const express = require('express');
const router = express.Router();

const userController = require('@app/controllers/user.controller');

const runValidation = require("@app/validators");
const userValidators = require("@app/validators/user.validators"); 

router.get("/whoami", userController.whoami);
router.patch("/update/password", userValidators.changePassword, runValidation, userController.changePassword);

module.exports = router;