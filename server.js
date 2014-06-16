'use strict';

var http       = require('http'),
    express    = require('express'),
    bodyParser = require ('body-parser'),
    morgan     = require ('morgan'),
    faye       = require('faye');


var bayeux = new faye.NodeAdapter({
  mount:    '/faye',
  timeout:  45
});


var app = express();
var server = http.createServer(app);

bayeux.attach(server);

app.use(morgan());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.post('/message', function(req, res) {
  bayeux.getClient().publish('/channel', {text: req.body.message});
  res.send(200);
});

var port = process.env.port || 3000;
server.listen(port);
console.log('Server up and listening on port ' + port);



