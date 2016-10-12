var fs = require('fs'),
    path = require('path'),
    merge = require('merge'),
    exists = require('file-exists');

module.exports = function(file){

    if (typeof file == 'string') {
        file = {
            'path': file
        }
    }

    this.file = file

    this.file.parse = path.parse(this.file.path)

    this.overwriteOn = false;

    this.reload = (newValues) => {
        this.file = merge(true, this.file, newValues);
        this.file.parse = path.parse(this.file.path);

        if (this.file.filename) {
            this.file.filename = this.file.parse.name;
        }

        return this;
    }

    this.move = (newPath, rename) => {
        var newPath = path.resolve(newPath, rename || this.file.parse.name);
        fs.renameSync(this.file.path, newPath);
        return this.reload({ path: newPath });
    }

    this.get = (item) => {
        if (!item) {
            return this.file;
        } else {
            return this.file[item];
        }
    }

    this.overwrite = (overwrite = false) => {
        this.overwriteOn = overwrite;
    }

    this.rename = (newName, overwrite) => {
        if (overwrite !== undefined) {
            this.overwriteOn = overwrite;
        }

        var newPath = path.resolve(this.file.parse.dir, newName);

        if (!this.overwriteOn && exists(newPath)) {
            return new Error('The file exists and can not be overwritten, use "overwrite(true)" to overwrite the file')
        }

        fs.renameSync(this.file.path, newPath)
        return this.reload({ path: newPath });
    }

    this.delete = (callback) => {
        fs.unlinkSync(this.file.path);
        return this;
    }

    return this;
};
