module.exports = function (sequelize, Sequelize) {
    var Post = sequelize.define("Post", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        text: { type: Sequelize.STRING(1023) },
    });
    return Post;
};
