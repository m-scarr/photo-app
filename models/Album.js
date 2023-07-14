module.exports = function (sequelize, Sequelize) {
    var Album = sequelize.define("Album", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        name: { type: Sequelize.STRING(255) },
        description: { type: Sequelize.STRING(1023) },
    });
    return Album;
};
