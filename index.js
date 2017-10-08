const mongoose = require('mongoose');
const express = require('express')
const port = process.env.PORT || 3000

const Chat = require('./models/chat')
var app = express()

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})

app.use(express.static(__dirname + '/public'))

let server = app.listen(port, function(){
  console.log('listening on *:' + port)
})

var io = require('socket.io')(server)

io.on('connection', function(socket){
  // register listener on server
  socket.on('chatChannel', function(chat){
    // send to all registeres
    io.emit('chatChannel', chat)

    // todo save it
    console.log(chat)
    insertChat(chat)
  })
})


function insertChat (chat) {
  const DB_URL = 'mongodb://localhost/chat-room';

	if (mongoose.connection.readyState == 0) {
		mongoose.connect(DB_URL);
	}

  chat.when = new Date()
  var chat = new Chat(chat)

  chat.save((err, chat) => {
    if (err) console.error(err)
  })
}
