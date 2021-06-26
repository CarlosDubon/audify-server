const express = require("express");
const router = express.Router();

const {ROLES} = require("@app/constants");

const { roleValidatorHelper } = require("@app/middlewares/auth.middlewares");
const runValidator = require("@app/validators");
const { registerValidator } = require("@app/validators/output.validators");

const outputController = require("@app/controllers/output.controller");

router.get("/ask", outputController.askForOutput);

router.use(roleValidatorHelper(ROLES.ADMIN));
router.post("/", registerValidator, runValidator, outputController.register);

module.exports = router;