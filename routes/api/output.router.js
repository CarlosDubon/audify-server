const express = require("express");
const router = express.Router();

const outputController = require("@app/controllers/output.controller");

router.get("/ask", outputController.askForOutput);

module.exports = router;