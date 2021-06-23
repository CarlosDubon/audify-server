const express = require('express');
const router = express.Router();

const { authRequired } = require('@app/middlewares/auth.middlewares');

const authRouter = require('./api/auth.router');
const userRouter = require('./api/user.router');

router.use("/auth", authRouter);

//Authorization needed
router.use(authRequired);

router.use("/user", userRouter);

module.exports = router;