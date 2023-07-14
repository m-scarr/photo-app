module.exports = (db) => {
    require("./Album")(db);
    require("./Friendship")(db);
    require("./FriendshipRequest")(db);
    require("./Keyword")(db);
    require("./Message")(db);
    require("./Post")(db);
    require("./User")(db);
    require("./Photo")(db);
}