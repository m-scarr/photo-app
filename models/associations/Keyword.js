module.exports = (db) => {
    db.Keyword.belongsTo(db.Photo, {
        foreignKey: "photoId",
        as: "photo"
    })
};
