const { Posts, Comments, sequelize } = require("../models");

module.exports = {
  get: async (req, res, next) => {
    try {
      const posts = await Posts.findAll({
        attributes: ["id", "title", "body", "createdAt"],
        include: [
          {
            model: Comments,
            as: "comments",
            attributes: ["id", "body", "createdAt"],
          },
        ],
      });

      res.send({
        success: true,
        message: "Posts list",
        data: posts,
      });
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    try {
      const {
        params: { postId },
      } = req;

      const post = await Posts.findOne({
        attributes: ["id", "title", "body", "createdAt"],
        include: [
          {
            model: Comments,
            as: "comments",
            attributes: ["id", "body", "userId", "createdAt"],
          },
        ],
        where: {
          id: postId,
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
        params: { userId },
      } = req;

      await Posts.create(
        {
          title,
          body,
          userId,
        },
        {
          transaction,
        }
      );

      await transaction.commit();
      res.status(201).send({
        success: true,
        message: "Post created successfully",
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
        body: { title, body },
        params: { postId },
      } = req;

      await Posts.update(
        {
          title,
          body,
        },
        {
          where: {
            id: postId,
          },
          transaction,
        }
      );

      await transaction.commit();
      res.status(201).send({
        success: true,
        message: "Post update successfully",
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
        params: { postId },
      } = req;

      await Posts.destroy({
        where: {
          id: postId,
        },
        transaction,
      });

      await transaction.commit();
      res.status(200).send({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
  userPosts: async (req, res, next) => {
    try {
      const {
        params: { userId },
      } = req;

      const userPosts = await Posts.findAll({
        attributes: ["id", "title", "body"],
        include: [
          {
            model: Comments,
            as: "comments",
            attributes: ["id", "body", "createdAt"],
          },
        ],
        where: {
          userId,
        },
      });

      res.send({
        success: true,
        message: "User posts list",
        data: userPosts,
      });
    } catch (err) {
      next(err);
    }
  },
};
