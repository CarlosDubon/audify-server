const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const database = require('@app/config/mongoose');
const apiRouter = require('@app/routes/api.router');

const { errorHandler } = require('@app/middlewares/handler.middlewares');

const app = express();

database.connect();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(["/api", "/api/v1", "/v1"], apiRouter);
app.use(errorHandler);

module.exports = app;
