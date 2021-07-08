const express = require('express');
const router = express.Router();

const { authRequired } = require('@app/middlewares/auth.middlewares');

const authRouter = require('./api/auth.router');
const userRouter = require('./api/user.router');
const outputRouter = require('./api/output.router');

router.use("/auth", authRouter);

//Authorization needed
router.use(authRequired);

router.use("/user", userRouter);
router.use("/output", outputRouter)

module.exports = router;