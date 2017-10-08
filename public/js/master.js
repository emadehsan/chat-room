var app = new Vue({
  el: '#app',
  data: {
    currentUser: 'emad',
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
    ]
  }
})
