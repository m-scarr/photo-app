module.exports = (db) => {
    require("./Album")(db);
    require("./Friendship")(db);
    require("./FriendshipRequest")(db);
    require("./Keyword")(db);
    require("./Message")(db);
    require("./Photo")(db);
    require("./Post")(db);
    require("./User")(db);
}