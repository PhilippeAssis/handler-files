var Entity = require('./entity'),
    merge = require('merge'),
    multer = require('multer');

module.exports = (request, response) => {

    this._upload = null

    this.http = (req, res) => {
        request = req
        response = res
        return this;
    }

    this.entity = (entity) => {
        return new Entity(entity);
    }

    this.storage = (config = {}) => {
        this._upload = multer({
            storage: multer.diskStorage(merge(true, {
                destination: function(req, file, cb) {
                    cb(null, './tmp')
                },
                filename: function(req, file, cb) {
                    cb(null, file.fieldname + '-' + Date.now())
                }
            }, config))
        });
    }

    this.files = (files, maxcount) => {
        var up;

        if (maxcount) {
            up = this._upload.array(files, maxcount)
        } else if (typeof files == 'string') {
            up = this._upload.single(files)
        } else if (files) {
            up = this._upload.fields(files)
        } else {
            up = this._upload.any()
        }

        return new Promise((resolve, reject) => {
            up(request, response, function(err) {
                if (err) {
                    return reject(err)
                }

                var entitys;

                if (request.file) {
                    entitys = new Entity(request.file);
                } else if (request.files) {
                    entitys = [];
                    request.files.map((file) => {
                        entitys.push(new Entity(file))
                    })
                }

                resolve(entitys)
            })
        })
    }

    this.then = (callback, error) => {
        this.files().then(callback, error)
    }

    this.storage();

    return this;
}
