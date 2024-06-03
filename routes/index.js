const express = require("express");
const router = express.Router();

// Routers
const userRouter = require("./user");
const postRouter = require("./post");
const commentRouter = require("./comment");

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

module.exports = router;
