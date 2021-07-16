const { body, param } = require("express-validator");

const validators = {};

validators.idInParams = [
  param("id")
    .notEmpty().withMessage("Id field is required")
    .isMongoId().withMessage("Id must be mongo id")
]

validators.register = [
  body("name")
    .notEmpty().withMessage("Name field is required")
    .isLength({ min: 4, max: 32 }).withMessage("Name length must be between 4 y 32"),
  body("latitude")
    .notEmpty().withMessage("Latitude field is required")
    .isNumeric().withMessage("Latitude must be numeric"),
  body("longitude")
    .notEmpty().withMessage("Longitude field is requiered")
    .isNumeric().withMessage("Longitude must be numeric"),
  body("radius")
    .notEmpty().withMessage("Radius field is requiered")
    .isNumeric().withMessage("Radius must be numeric"),
  body("sound")
    .notEmpty().withMessage("Sound file is required")
]

validators.update = [
  body("name").optional()
    .notEmpty().withMessage("Name field is required")
    .isLength({ min: 4, max: 32 }).withMessage("Name length must be between 4 y 32"),
  body("latitude").optional()
    .notEmpty().withMessage("Latitude field is required")
    .isNumeric().withMessage("Latitude must be numeric"),
  body("longitude").optional()
    .notEmpty().withMessage("Longitude field is requiered")
    .isNumeric().withMessage("Longitude must be numeric"),
  body("radius").optional()
    .notEmpty().withMessage("Radius field is requiered")
    .isNumeric().withMessage("Radius must be numeric"),
  body("sound").optional()
    .notEmpty().withMessage("Sound file is required")
]

validators.updatePhoto = [
  body("photo")
    .notEmpty().withMessage("Photo field is required")
]

module.exports = validators;