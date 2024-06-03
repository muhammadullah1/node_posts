const { Posts, Comments, sequelize } = require("../models");

module.exports = {
  getByPostId: async (req, res, next) => {
    try {
      const {
        params: { postId },
      } = req;

      const post = await Comments.findAll({
        attributes: ["id", "body", "createdAt"],
        where: {
          postId,
        },
      });

      res.send({
        success: true,
        message: "Post found",
        data: post,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { title, body },
        params: { userId, postId },
      } = req;

      await Comments.create(
        {
          title,
          body,
          userId,
          postId,
        },
        {
          transaction,
        }
      );

      await transaction.commit();
      res.status(201).send({
        success: true,
        message: "Comment created successfully",
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
  update: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { body },
        params: { commentId },
      } = req;

      await Comments.update(
        {
          body,
        },
        {
          where: {
            id: commentId,
          },
          transaction,
        }
      );

      await transaction.commit();
      res.status(201).send({
        success: true,
        message: "Comment update successfully",
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
  delete: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        params: { userId, commentId },
      } = req;

      await Comments.destroy({
        where: {
          id: commentId,
          userId,
        },
        transaction,
      });

      await transaction.commit();
      res.status(200).send({
        success: true,
        message: "Comment deleted successfully",
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
};
