let socket = io();

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
  },
  methods: {
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
    }
  }
})
