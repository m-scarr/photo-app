module.exports = (db) => {
    db.Message.belongsTo(db.User, {
        foreignKey: "receiverId",
        as: "recipient"
    })
};
