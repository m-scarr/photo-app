module.exports = function (sequelize, Sequelize) {
    var FriendshipRequest = sequelize.define("FriendshipRequest", {
        requesterId: { type: Sequelize.INTEGER, primaryKey: true },
        userId: { type: Sequelize.INTEGER, primaryKey: true },
        message: { type: Sequelize.STRING(255) },
    });
    return FriendshipRequest;
};
