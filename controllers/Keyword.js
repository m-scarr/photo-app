const limitAttributes = require("./limitAttributes");
var requestData;

module.exports = {
  unauthorized: {
    get: {
    },
    post: {
    },
    put: {
    },
    delete: {
    }
  },
  authorized: {
    get: {},
    post: {
      create: (db, req, res) => {
        requestData = limitAttributes(req.body, ["word", "photoId", "albumId"]);
        requestData.word = requestData.word.split(" ")[0];
        db.Keyword.create(requestData)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            res.json(false);
          });
      },
      createMultiple: (db, req, res) => {
        requestData = limitAttributes(req.body, ["words", "photoId", "albumId"]);
        var wordData = [];
        if (typeof requestData.photoId !== "undefined") {
          requestData.words.forEach((word) => {
            wordData[wordData.length] = {
              word: word,
              photoId: requestData.photoId,
            };
          });
        } else {
          requestData.words.forEach((word) => {
            wordData[wordData.length] = {
              word: word,
              albumId: requestData.albumId,
            };
          });
        }
        db.Keyword.bulkCreate(wordData)
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
        db.Keyword.destroy({ where: { id: req.query.id } })
          .then(() => {
            res.json(true);
          })
          .catch((err) => {
            console.log(err);
            res.json(false);
          });
      },
    },
  }
};
