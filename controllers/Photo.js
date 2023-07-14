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
            albumId: null,
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
    },
    post: {
      create: (db, req, res) => {
        var imgs = [];
        req.files.forEach((file) => {
          imgs[imgs.length] =
            typeof req.query.albumId === "undefined"
              ? {
                  photoRef: file.filename,
                  userId: req.user.id,
                }
              : {
                  photoRef: file.filename,
                  albumId: req.query.albumId,
                };
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
    },
    put: {
      update: (db, req, res) => {
        requestData = limitAttributes(req.body, ["description", "albumId"]);
        if (typeof requestData.albumId !== "undefined") {
          if (requestData.albumId == null) {
            requestData.userId = req.user.id;
          } else {
            requestData.userId = null;
          }
        }
        db.Photo.update(requestData, {
          where: { id: req.body.id },
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
