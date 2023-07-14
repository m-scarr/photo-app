module.exports = (db) => {
    db.Album.belongsTo(db.User, {
        foreignKey: "userId",
        as: "user"
    })
    db.Album.hasMany(db.Photo, {
        foreignKey: "albumId",
        as: "photos",
        onDelete: "cascade"
    })
};
