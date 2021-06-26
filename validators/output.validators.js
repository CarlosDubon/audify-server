const { body } = require("express-validator");

const validators = {};

validators.registerValidator = [
  body("device")
    .notEmpty().withMessage("device field is required"),
  body("channels")
    .notEmpty().withMessage("channels field is required")
    .isArray({ min: 2 }).withMessage("channels must be at least two"),
  body("channels.*")
    .isInt().withMessage("channel must be a number")
]

module.exports = validators;