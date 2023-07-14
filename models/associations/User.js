module.exports = (db) => {
    db.User.hasMany(db.Post, {
        foreignKey: "userId",
        as: "outgoingPosts",
        onDelete: "cascade"
    })

    db.User.belongsTo(db.Photo, {
        as: "profilePhoto"
    })

    db.User.hasMany(db.Message, {
        foreignKey: "receiverId",
        as: "messages",
        onDelete: "cascade"
    })

    db.User.hasMany(db.Post, {
        foreignKey: "targetId",
        as: "timelinePosts",
        onDelete: "cascade"
    })

    db.User.hasMany(db.Album, {
        foreignKey: "userId",
        as: "albums",
        onDelete: "cascade"
    })
};
