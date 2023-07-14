module.exports = (db) => {
    db.Photo.belongsTo(db.Album, {
        foreignKey: "albumId",
        as: "album"
    })

    db.Photo.hasMany(db.Keyword, {
        foreignKey: "photoId",
        as: "keywords",
        onDelete: "cascade"
    })
};