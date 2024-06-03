const { Users, sequelize } = require("../models");

module.exports = {
  get: async (req, res, next) => {
    try {
      const users = await Users.findAll({
        attributes: ["id", "name", "email", "createdAt"],
        where: {
          is_super_admin: false,
        },
      });

      res.send({
        success: true,
        message: "Users list",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    try {
      const {
        params: { userId },
      } = req;

      const user = await Users.findOne({
        attributes: ["id", "name", "email", "createdAt"],
        where: {
          id: userId,
          is_super_admin: false,
        },
      });

      res.send({
        success: true,
        message: "User found",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { name, email, password },
      } = req;

      await Users.create(
        {
          name,
          email,
          password,
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
        body: { name, password },
      } = req;

      await Users.update(
        {
          name,
          password,
        },
        {
          transaction,
        }
      );

      await transaction.commit();
      res.status(201).send({
        success: true,
        message: "user update successfully",
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
        params: { userId },
      } = req;

      await Users.destroy({
        where: {
          id: userId,
        },
        transaction,
      });

      await transaction.commit();
      res.status(200).send({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
};
