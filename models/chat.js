/**
 * Chat model
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
let chatSchema = new Schema({
	text: String,
	by: String,
	when: Date
})

// the schema is useless so far
// we need to create a model using it
const Chat = mongoose.model('Chat', chatSchema)

// make this available to Node applications
module.exports = Chat
