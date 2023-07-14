module.exports = function (sequelize, Sequelize) {
    var Friendship = sequelize.define("Friendship", {
        requesterId: { type: Sequelize.INTEGER, primaryKey: true },
        userId: { type: Sequelize.INTEGER, primaryKey: true },
    });
    return Friendship;
};
