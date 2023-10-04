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
        //to do
      },
      readByUser: (db, req, res) => {
        db.Album.findAll({
          where: { userId: req.query.userId },
          include: [
            {
              model: db.Photo,
              as: "photos",
              include: [
                {
                  model: db.Keyword,
                  as: "keywords",
                },
              ],
            }
          ],
        })
          .then((albums) => {
            res.json(albums)
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
        db.Album.create({ ...requestData, userId: req.user.id })
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
        requestData = limitAttributes(req.body, ["description", "name"]);
        db.Album.update(requestData, {
          where: { id: req.body.id, userId: req.user.id },
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
    delete: {
      delete: (db, req, res) => {
        db.Album.destroy({ where: { id: req.query.id, userId: req.user.id } })
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
