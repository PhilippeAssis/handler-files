var upload = require('./index').upload,
    local = require('./index').local,
    express = require('express'),
    app = express()

app.listen('4040');

app.get('/', function(req, res) {
    res.send('hello world');
});

app.post('/', function(req, res) {
    upload(req, res).files('avatar').then((file) => {
        console.log(local.dir('./uploads'))
    })

    res.send('ok')
});
