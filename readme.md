#Handler Files for Node.js
Collection of libraries and shortcuts for local file handling and carrecados with express.js (multer)


## Express
```javascritp
var upload = require('./index').upload,
    express = require('express'),
    app = express()

app.listen('4040');

app.post('/', function(req, res) {
    upload(req, res).files('avatar').then((file) => {
        res.send(file)
    })
});

```

## Local
```javascritp
var local = require('').local

local.dir('./uploads') //List all
local.dir(['./uploads', './tmp']) //List all in all folders
local.file('./image.jpg') //get file
local.file(['./image.jpg', './photo.jpg']) //get files
local.findName('./uploads', /.jpg/) //returns all files with the extension .jpg ./uploads folder
local.findContent('./uploads', /.jpg/) //returns all files with the contents "hello" in ./uploads folder

```
