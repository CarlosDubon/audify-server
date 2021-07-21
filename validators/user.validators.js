const { body } = require("express-validator");
const { REGEXP } = require("@app/constants");

const validators = {};

validators.changePassword = [
  body("password")
    .notEmpty().withMessage("Password field is require")
    .matches(REGEXP.PASSWORD).withMessage("Invalid password format")
    .isLength({ min: 8, max:32}).withMessage("password field must be between 8 and 32 characters")
]

module.exports = validators;