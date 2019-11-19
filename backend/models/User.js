/**
 * Users
 */
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "user",
    {
      username: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      email: DataTypes.STRING(100),
      password: DataTypes.STRING(6)
    },
    {
      modelName: user,
      timestamps: false
    }
  );

  return user;
};
