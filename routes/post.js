const express = require("express");
const router = express.Router({ mergeParams: true });
const validate = require("../middlewares/validate");
const commentRouter = require("./comment");

// Controllers
const controller = require("../controllers/post");

// Middlewares
const { createPost, updatePost } = require("../validations/post");

router.get("/", controller.get);
router.get("/:postId", controller.getById);
router.post("/", validate(createPost), controller.create);
router.put("/:postId", validate(updatePost), controller.update);
router.delete("/:postId", controller.delete);
router.get("/posts", controller.userPosts);

router.use("/:postId/comments", commentRouter)

module.exports = router;
