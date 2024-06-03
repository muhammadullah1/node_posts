module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comments",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timeStamps: true,
    }
  );

  Comment.associate = (model) => {
    Comment.belongsTo(model.Users, {
      as: "userComments",
      foreignKey: "userId",
    });
    Comment.belongsTo(model.Posts, {
      as: "comments",
      foreignKey: "postId",
    });
  };
  return Comment;
};
