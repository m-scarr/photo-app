module.exports = (db) => {
    db.User.afterCreate((user) => {
        db.Album.create({ name: "Assorted Photos", userId: user.dataValues.id })
    })
};
