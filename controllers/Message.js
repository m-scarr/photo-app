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
      readUserInbox: (db, req, res) => {
        db.Message.findAll({
          where: {
            [db.Sequelize.Op.and]: [
              { receiverId: req.user.id },
              { showInReceived: true },
            ],
          },
        })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
      readUserOutbox: (db, req, res) => {
        db.Message.findAll({
          where: {
            [db.Sequelize.Op.and]: [
              { senderId: req.user.id },
              { showInSent: true },
            ],
          },
        })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
      readConversation: (db, req, res) => {
        db.Messages.findAll({
          where: {
            [db.Sequelize.Op.or]: [
              {
                [db.Sequelize.Op.and]: [
                  { receiverId: req.user.id },
                  { senderId: req.query.otherId },
                  { showInReceived: true },
                ],
              },
              {
                [db.Sequelize.Op.and]: [
                  { senderId: req.user.id },
                  { receiverId: req.query.otherId },
                  { showInSent: true },
                ],
              },
            ],
          },
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
    post: {
      create: (db, req, res) => {
        requestData = limitAttributes(req.body, ["description", "name"]);
        db.Message.create({
          senderId: req.user.id,
          receiverId: req.body.receiverId,
          content: req.body.content,
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
    put: {
      update: (db, req, res) => {
        requestData = limitAttributes(req.body, [
          "showInSent",
          "showInReceived",
        ]);
        db.Message.find({ where: { id: req.body.id } }).then((message) => {
          if (
            (typeof req.body.showInSent !== "undefined" &&
              message.dataValues.senderId === req.user.id) ||
            (typeof req.body.showInReceived !== "undefined" &&
              message.dataValues.receiverId === req.user.id)
          ) {
            message
              .update(requestData)
              .then((result) => {
                res.json(result);
              })
              .catch((err) => {
                console.log(err);
                res.json(false);
              });
          } else {
            res.json(false);
          }
        });
      },
    },
    delete: {},
  },
};
