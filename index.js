const express = require('express')
const port = process.env.PORT || 3000

const mongoose = require('mongoose')

// local
// const DB_URL = 'mongodb://localhost/chat-room'

// mlab
const USER = 'duwusege'
const PASS = 'duwusege1'
const DB_URL = `mongodb://${USER}:${PASS}@ds113935.mlab.com:13935/chat-room-pk`

const Chat = require('./models/chat')
var app = express()

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/history', (req, res) => {
  getChats((chats) => {
    res.json(chats)
  })
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

/**
 * saves the chat item
 */
function insertChat (chat) {
	if (mongoose.connection.readyState == 0) {
		mongoose.connect(DB_URL, {
      useMongoClient: true
    })
	}

  chat.when = new Date()
  var chat = new Chat(chat)

  chat.save((err, chat) => {
    if (err) console.error(err)
  })
}

/**
 * return some chat history
 */
function getChats (callback) {
  // check connection
  if (mongoose.connection.readyState === 0) {
		mongoose.connect(DB_URL, {
      useMongoClient: true
    })
	}

	let LIMIT = 50
	let query

	query = Chat.find({})
    .sort({when: -1})			// latest first
		.limit(LIMIT)

	query
		.exec((err, chats) => {
  		if (err) console.error(err)

  		callback(chats)
  	})
}
