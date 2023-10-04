const fs = require('fs')
const path = require('path')

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        var temp = file.originalname.split(".");
        var extension = temp[temp.length - 1];
        cb(null, fs.readdirSync(path.join(__dirname,"..","uploads")).length + '.' + extension)
    }
})
var upload = multer({ storage: storage }).array("image", 10)

module.exports = {
    unauthorized: {
        get: {
        },
        post: {
        },
        put: {
        },
        delete: {}
    },
    authorized: {
        get: {
        },
        post: {
            image: (db, req, res) => {
                console.log(req.body)
                upload(req, res, function (error) {
                    if (error) {
                        res.json(error)
                    } else {
                        require("./Photo").authorized.post.createMultiple(db, req, res);
                    }
                });
            }
        },
        put: {
        },
        delete: {
        },
    }
};
