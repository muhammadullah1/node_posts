const express = require("express");
const router = express.Router({ mergeParams: true });
const validate = require("../middlewares/validate");

// Controllers
const controller = require("../controllers/comment");

// Middlewares
const { udpateComment, createComment } = require("../validations/comment");

router.post("/", validate(createComment), controller.create);
router.get("/", controller.getByPostId);
router.delete("/:commentId", controller.delete);
router.put("/:commentId", validate(udpateComment), controller.update);

module.exports = router;
