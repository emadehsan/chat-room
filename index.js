var app = require('express')();

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

let server = app.listen(port, function(){
  console.log('listening on *:' + port);
});

var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
