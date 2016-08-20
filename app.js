'use strict'

var express = require('express')
  , http = require('http')
  , app = express()
  , path = require('path')
  , server = http.createServer(app);

app.use(express.static(__dirname+'/view'));
app.use(express.static(__dirname+'/resource/texture'));
app.use(express.static(__dirname+'/resource/font'));
app.use(express.static(__dirname+'/resource/audio'));
app.use(express.static(__dirname+'/scripts/plugin'));
app.use(express.static(__dirname+'/scripts'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/view/index.html'));
});

server.listen(8000, function() {
  console.log('Express server listening on port ' + server.address().port);
});