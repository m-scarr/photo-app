module.exports = function (sequelize, Sequelize) {
    var Photo = sequelize.define("Photo", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        photoRef: { type: Sequelize.STRING(255) },
        description: { type: Sequelize.STRING(1023) },
    });
    return Photo;
};
