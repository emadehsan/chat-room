let socket = io();

let app = new Vue({
  el: '#app',
  data: {
    currentUser: 'emad',
    msg: '',
    messages: [
      {
        by: 'emad',
        text: "What's going on?"
      },
      {
        by: 'abbasi',
        text: "It's raining."
      },
      {
        by: 'abbasi',
        text: "How's the climate at your side?"
      },
      {
        by: 'emad',
        text: "It hasn't rained for a few months. But temperature is quite moderate."
      }
    ],
    socket: io()
  },
  created () {
    // init code

    console.log('created')
    // receive event listener
    this.socket.on('chat message', function(obj) {
        console.log('received: ', obj);
        window.scrollTo(0, document.body.scrollHeight);
    })
  },
  methods: {
    send (event) {
      console.log('sending');
      let message = this.msg
      let by = this.currentUser

      this.socket.emit('chat message', {
        text: message,
        by: by
      })
      console.log({
        text: message,
        by: by
      })
    }
  }
})
