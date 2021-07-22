const express = require('express');
const router = express.Router();
const { ROLES } = require("@app/constants");

const userController = require('@app/controllers/user.controller');

const runValidation = require("@app/validators");
const userValidators = require("@app/validators/user.validators"); 
const { roleValidatorHelper } = require("@app/middlewares/auth.middlewares"); 

router.get("/whoami", userController.whoami);
router.patch("/update/password", userValidators.changePassword, runValidation, userController.changeOwnPassword);

router.use(roleValidatorHelper(ROLES.ADMIN));

router.get("/find", userController.findAll);
router.get("/find/:id", userValidators.idInParams, runValidation, userController.findById);
router.patch("/update/password/:id", userValidators.changePassword, userValidators.idInParams, runValidation, userController.changeUserPassword);
router.patch("/promote/toadmin/:id", userValidators.idInParams, runValidation, userController.promoteUserToRole(ROLES.ADMIN));
router.patch("/promote/touser/:id", userValidators.idInParams, runValidation, userController.promoteUserToRole(ROLES.USER));

module.exports = router;