const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const fs = require("fs");

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

app.use(["/api/v1", "/api", "/v1"], apiRouter);

app.use(express.static(path.join(__dirname, 'build')));
app.get("/*", (req, res)=> {
  res.format({
    html: ()=> {
      try {
        if(fs.existsSync(path.join(__dirname, 'build', 'index.html'))){
          res.sendFile(path.join(__dirname, 'build', 'index.html'));
        } else {
          res.status(404).send("Not Found");
        }
      } catch (error) {
        res.status(404).send("Not Found");
      }
    },
    default: ()=> {
      res.status(404).send("Not Found");
    }
  });
})

app.use(errorHandler);

module.exports = app;
