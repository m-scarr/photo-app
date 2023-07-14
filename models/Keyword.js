module.exports = function (sequelize, Sequelize) {
    var Keyword = sequelize.define("Keyword", {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        word: { type: Sequelize.STRING(255) },
    });
    return Keyword;
};
