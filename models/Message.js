module.exports = function (sequelize, Sequelize) {
    var Message = sequelize.define("Message", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        senderId: { type: Sequelize.INTEGER },
        content: { type: Sequelize.STRING(10230) },
        showInSent: {type: Sequelize.BOOLEAN, defaultValue:true },
        showInReceived: {type: Sequelize.BOOLEAN, defaultValue:true },
    });
    return Message;
};
