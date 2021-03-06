const { body, param } = require("express-validator");
const { SPEAKERS } = require("@app/constants");

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
  body("type")
    .notEmpty().withMessage("Type field is requiered")
    .isNumeric().withMessage("Type must be numeric")
    .toInt()
    .isIn(SPEAKERS.ID_FUNCTIONS).withMessage("Type must be registered"),
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
  body("type").optional()
    .notEmpty().withMessage("Type field is requiered")
    .isNumeric().withMessage("Type must be numeric")
    .toInt()
    .isIn(SPEAKERS.ID_FUNCTIONS).withMessage("Type must be registered"),
  body("sound").optional()
    .notEmpty().withMessage("Sound file is required")
]

validators.updatePhoto = [
  body("photo")
    .notEmpty().withMessage("Photo field is required")
]

validators.idsInArray = [
  body("speakers")
    .notEmpty().withMessage("Speakers field is required")
    .isArray({ min: 1 }).withMessage("Speakers must be an array of at least 1 item"),
  body("speakers.*")
    .notEmpty().withMessage("Not empty item allowed")
    .isMongoId().withMessage("Speaker's item must be a mongo id")
]

module.exports = validators;