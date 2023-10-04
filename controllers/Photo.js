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
            word: { [db.Sequelize.Op.like]: "%" + word + "%" },
          };
        });
        db.Keyword.findAll({
          where: {
            [db.Sequelize.Op.or]: queryArray,
          },
        })
          .then((results) => {
            var photoIds = [];
            results.forEach((result) => {
              photoIds[photoIds.length] = result.dataValues.photoId;
            });
            var photoCountObject = {};
            photoIds.forEach((photoId) => {
              if (typeof photoCountObject[photoId.toString()] === "undefined") {
                photoCountObject[photoId.toString()] = 1;
              } else {
                photoCountObject[photoId.toString()] += 1;
              }
            });
            db.Photo.findAll({
              where: { id: [...new Set(photoIds)] },
              order: [["createdAt", "DESC"]],
            })
              .then((photos) => {
                if (req.query.sort === "Relevance") {
                  var sortedPhotos = [];
                  var i;
                  var photo;
                  Object.keys(photoCountObject).forEach((photoId) => {
                    for (i = 0; i < photos.length; i++) {
                      if (photos[i].dataValues.id === parseInt(photoId)) {
                        photo = photos[i].dataValues;
                        photo.relevancy = photoCountObject[photoId];
                        break;
                      }
                    }
                    i = 0;
                    while (
                      i < sortedPhotos.length &&
                      photo.relevancy < sortedPhotos[i].relevancy
                    ) {
                      i++;
                    }
                    sortedPhotos.splice(i, 0, photo);
                  });
                  res.json(sortedPhotos);
                } else {
                  res.json(photos);
                }
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
      readByUser: (db, req, res) => {
        db.Photo.findAll({
          where: { userId: req.query.userId },
          include: [{ model: db.Keyword, as: "keywords" }],
        })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
      readByAlbum: (db, req, res) => {
        db.Album.findAll({
          where: { id: req.query.albumId },
          include: [{ model: db.Photo, as: "photos", include: [{ model: db.Keyword, as: "keywords" }] }]
        }).then((result) => {
          res.json(result);
        })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      }
    },
    post: {
      createMultiple: (db, req, res) => {
        var imgs = [];
        req.files.forEach((file) => {
          imgs[imgs.length] = { photoRef: file.filename, albumId: req.query.albumId, };
        });
        db.Photo.bulkCreate(imgs)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
      update: (db, req, res) => {
        requestData = limitAttributes(req.body, ["description", "albumId"]);
        db.Photo.update(requestData, {
          where: { id: req.body.id },
        })
          .then((result) => {
            res.json(result > 0);
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
    },
    delete: {
      delete: (db, req, res) => {
        db.Photo.destroy({ where: { id: req.user.id } })
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
