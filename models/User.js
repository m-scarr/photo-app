module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define("User", {
      id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      logInName: {
        type: Sequelize.STRING(255),
        unique: true
      },
      displayName: { type: Sequelize.STRING(255) },
      email: { type: Sequelize.STRING(255) },
      phone: { type: Sequelize.STRING(255) },
      job: { type: Sequelize.STRING(255) },
      employer: { type: Sequelize.STRING(255) },
      aboutMe: { type: Sequelize.STRING(1023) },
      password: { type: Sequelize.STRING },
      salt: { type: Sequelize.STRING },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active",
      },
    });
    return User;
  };