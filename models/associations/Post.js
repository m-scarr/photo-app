module.exports = (db) => {
    db.Post.belongsTo(db.User, {
        foreignKey: "userId",
        as: "poster"
    })

    db.Post.belongsTo(db.User, {
        foreignKey: "targetId",
        as: "target"
    })

    db.Post.belongsTo(db.Photo, {
        foreignKey: "photoId",
        as: "photo"
    });
};
