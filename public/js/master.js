let socket = io()

let app = new Vue({
  el: '#app',
  data: {
    currentUser: 'anonymous',
    msg: '',
    messages: [],
    socket: io()
  },
  created () {
    this.currentUser = prompt("What's your name?")

    // init code
    console.log('created')

    // register event listener
    this.socket.on('chatChannel', (chat) => {
        console.log('received!')
        this.messages.push(chat)
        window.scrollTo(0, document.body.scrollHeight);
    })

    console.log('fetching chats...')
    this.fetchChat()
  },
  methods: {
    /**
     * On click send button, sends the message to chat room
     */
    send (event) {
      let message = this.msg.trim()
      let by = this.currentUser

      if (message.length === 0) return

      this.msg = ''
      console.log('sending');

      this.socket.emit('chatChannel', {
        text: message,
        by: by
      })
    },
    /**
     * fetches chat history from REST API
     */
    fetchChat () {
      this.$http.get('/history').then(response => {
        if (response.body.length > 0) {
          // concatinate the reverse because the server sent the latest few in reverse order
          this.messages = this.messages.concat(response.body.reverse())
        }
      }, err => {
        console.error(err)
      });
    },
    humanReadable (date) {
      return moment(date).fromNow()
    }
  }
})
