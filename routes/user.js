const express = require("express");
const router = express.Router({ mergeParams: true });
const validate = require("../middlewares/validate");
const postRouter = require("./post");

// Controllers
const controller = require("../controllers/user");

// Middlewares
const { createUser, updateUser } = require("../validations/user");

router.get("/", controller.get);
router.post("/", validate(createUser), controller.create);
router.put("/:userId", validate(updateUser), controller.update);
router.delete("/:userId", controller.delete);
router.get("/:userId", controller.getById);

router.use("/:userId/posts", postRouter)

module.exports = router;
