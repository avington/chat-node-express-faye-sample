var express = require('express'),
    faye = require('faye');

var bayeux = new faye.NodeAdapter({
  mount:    '/faye',
  timeout:  45
});

var app = express();
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

app.post('/message', function(req, res) {
  bayeux.getClient().publish('/channel', {text: req.body.message});
  res.send(200);
});

bayeux.attach(app);
app.listen(8123);
console.log("Server up and listening on port 8123")

