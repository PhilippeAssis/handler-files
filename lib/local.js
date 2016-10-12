var fs = require('fs'),
    path = require('path'),
    merge = require('merge'),
    exists = require('file-exists'),
    Entity = require('./entity');

module.exports = {
    file(itens) {
        if (Array.isArray(paths)) {
            return paths.map(file => {
                return new Entity(file)
            })
        }

        return new Entity(paths)
    },
    dir(paths) {
        if (Array.isArray(paths)) {
            var paths = paths.map(_path => {
                return fs.readdirSync(_path).map((file) => {
                    return new Entity(file)
                })
            })

            var pathsOne = paths[0];


            for (let i = 1; i < paths.length; i++) {
                pathsOne = pathsOne.concat(paths[i])
            }

            return pathsOne
        }

        return fs.readdirSync(paths).map((file) => {
            return new Entity(file)
        })
    },
    findName(_path, name, recursive = false) {
        var result = []
        var files = fs.readdirSync(_path).filter((file) => {
            return (file.search(name) > -1)
        })

        return files.map(file => {
            return new Entity(file);
        })
    },
    findContent(_path, name) {
        return fs.readdirSync(_path).filter(file => {
            return (fs.readFileSync(path.resolve(_path, file)).toString().search(name) > -1)
        }).map(file => {
          return new Entity(file);
        })
    }
}
