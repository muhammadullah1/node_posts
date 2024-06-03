module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_super_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timeStamps: true,
    }
  );

  User.associate = (model) => {
    User.hasMany(model.Posts, {
      as: "posts",
      foreignKey: "userId",
    });
  };
  return User;
};
