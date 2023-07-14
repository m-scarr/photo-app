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
      search: (db, req, res) => {
        words = req.query.query.split(" ");
        var queryArray = [];
        words.forEach((word) => {
          queryArray[queryArray.length] = {
            text: { [db.Sequelize.Op.like]: "%" + word + "%" },
          };
        });
        db.Post.findAll({
          where: {
            [db.Sequelize.Op.or]: queryArray,
          },
          order: [["id", "DESC"]],
          include: [
            {
              model: db.User,
              as: "poster",
              include: [{ model: db.Photo, as: "profilePhoto" }],
            },
            { model: db.Photo, as: "photo" },
          ],
        })
          .then((posts) => {
            if (req.query.sort === "Relevance") {
              var modifiedPosts = [];
              var sortedPosts = [];
              var i;
              posts.forEach((post) => {
                modifiedPosts[modifiedPosts.length] = {
                  ...post.dataValues,
                  relevancy: 0,
                };
                9;
                words.forEach((word) => {
                  modifiedPosts[modifiedPosts.length - 1].relevancy +=
                    modifiedPosts[modifiedPosts.length - 1].text.includes(word)
                      ? 1
                      : 0;
                });
                i = 0;
                while (
                  i < sortedPosts.length &&
                  sortedPosts[i].relevancy >
                    modifiedPosts[modifiedPosts.length - 1].relevancy
                ) {
                  i++;
                }
                sortedPosts.splice(
                  i,
                  0,
                  modifiedPosts[modifiedPosts.length - 1]
                );
              });
              res.json(sortedPosts);
            } else {
              res.json(posts);
            }
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
      readTimelineByUser: (db, req, res) => {
        db.Post.findAll({
          where: { targetId: req.query.targetId },
          order: [["id", "DESC"]],
          include: [
            {
              model: db.User,
              as: "poster",
              include: [{ model: db.Photo, as: "profilePhoto" }],
            },
            { model: db.Photo, as: "photo" },
          ],
        })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
      readFeed: (db, req, res) => {
        db.Friendship.findAll({
          where: {
            [db.Sequelize.Op.or]: [
              { userId: req.user.id },
              { requesterId: req.user.id },
            ],
          },
        })
          .then((friendships) => {
            var friendIds = [];
            friendships.forEach((friendship) => {
              friendIds[friendIds.length] =
                req.user.id === friendship.dataValues.userId
                  ? friendship.dataValues.requesterId
                  : friendship.dataValues.userId;
            });
            db.Post.findAll({
              where: { userId: [req.user.id, ...friendIds] },
              include: [
                {
                  model: db.User,
                  as: "poster",
                  include: [{ model: db.Photo, as: "profilePhoto" }],
                },
                { model: db.Photo, as: "photo" },
              ],
              order: [["id", "DESC"]],
            })
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
        requestData = limitAttributes(req.body, [
          "photoId",
          "text",
          "targetId",
        ]);
        if (typeof requestData.targetId === "undefined") {
          requestData.targetId = req.user.id;
        }
        db.Post.create({ ...requestData, userId: req.user.id })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
    },
    put: {
      update: (db, req, res) => {
        requestData = limitAttributes(req.body, ["photoId", "text"]);
        db.Post.update(requestData, {
          where: { id: req.body.id, userId: req.userId },
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
    delete: {
      delete: (db, req, res) => {
        db.Post.destroy({ where: { id: req.query.id, userId: req.user.id } })
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
