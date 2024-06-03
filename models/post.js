module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "posts",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timeStamps: true,
    }
  );

  Post.associate = (model) => {
    Post.belongsTo(model.Users, {
      as: "posts",
      foreignKey: "userId",
    });
    Post.hasMany(model.Comments, {
      as: "comments",
      foreignKey: "postId",
    });
  };
  return Post;
};
