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
    get: {
      readByUser: (db, req, res) => {
        db.Friendship.findAll({
          where: {
            [db.Sequelize.Op.or]: [
              { userId: req.userId },
              { requesterId: req.userId },
            ],
          },
        })
          .then((friendships) => {
            res.json(result);
            var friendIds = [];
            friendships.forEach((friendship) => {
              friendIds[friendIds.length] =
                req.user.id === friendship.dataValues.userId
                  ? friendship.dataValues.requesterId
                  : friendship.dataValues.userId;
            });
            db.User.findAll({ where: { id: friendIds } })
              .then((result) => {
                res.json(result);
              })
              .catch((err) => {
                console.log(err);
                res.json(false);
              });
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
    },
    post: {
      create: (db, req, res) => {
        db.Friendship.create({
          requesterId: req.user.id,
          userId: req.query.userId,
        })
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
        db.Friendship.destroy({
          where: { requesterId: req.user.id, userId: req.query.userId },
        })
          .then((result) => {
            res.json(true);
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
    },
  },
};
