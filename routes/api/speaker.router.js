const express = require("express");
const router = express.Router();

const {ROLES} = require("@app/constants");

const { uploadAudio, uploadImage } = require("@app/middlewares/multer.middlewares");
const { roleValidatorHelper } = require("@app/middlewares/auth.middlewares");
const runValidator = require("@app/validators");
const speakerValidator = require("@app/validators/speaker.validator")

const speakerController = require("@app/controllers/speaker.controller");

router.get("/", speakerController.findAll);
router.get("/:id", speakerValidator.idInParams, runValidator, speakerController.findOneById);

router.use(roleValidatorHelper(ROLES.ADMIN)); 

router.post("/register", uploadAudio("sound").single("sound"),speakerValidator.register, runValidator, speakerController.register);
router.put("/update/:id", uploadAudio("sound").single("sound"), speakerValidator.idInParams, speakerValidator.update, runValidator, speakerController.update);
router.patch("/photo/:id", uploadImage("photo").single("photo"), speakerValidator.idInParams, speakerValidator.updatePhoto, runValidator, speakerController.udpatePhoto);
router.delete("/delete/many", speakerValidator.idsInArray, runValidator, speakerController.deleteMany);
router.delete("/delete/:id", speakerValidator.idInParams, runValidator, speakerController.delete);

module.exports = router;