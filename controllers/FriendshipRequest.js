const limitAttributes = require("./limitAttributes");
var requestData;

module.exports = {
  unauthorized: {
    get: {},
    post: {},
    put: {},
    delete: {},
  },
  authorized: {
    get: {},
    post: {
      create: (db, req, res) => {
        requestData = limitAttributes(req.body, ["userId", "message"]);
        db.Friendship.create({ ...requestData, requesterId: req.user.id })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
    },
    put: {},
    delete: {
      delete: (db, req, res) => {
        db.FriendshipRequest.destroy({
          where: { requesterId: req.user.id, userId: req.query.userId },
        })
          .then((result) => {
            if (req.query.accepted) {
              require("./Friendship").post.createFriendship(db, req, res);
            } else {
              res.json(true);
            }
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
    },
  },
};
