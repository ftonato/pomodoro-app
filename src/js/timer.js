/*global Vue*/
/*eslint no-undef: "error"*/
/*eslint-env browser*/

const notifier = require('node-notifier');
const path = require('path');

new Vue({
  el: '#app',
  data: {
    time: 1500,
    initial: 1500,
    started: false,
    breaktime: false,
    message: ['Pomodoro Complete', 'Breaktime Complete']
  },
  filters: {
    minutesAndSeconds() {
      let minutes = Math.floor(this.time / 60);
      let seconds = this.time - 60 * minutes;

      if (minutes < 10) {
        minutes = '0' + Math.floor(this.time / 60);
      } else if (minutes === 0) {
        minutes = '00';
      }

      if (seconds < 10) {
        seconds = '0' + (this.time - 60 * minutes);
      } else if (seconds === 0) {
        seconds = '00';
      }

      return minutes + ':' + seconds;
    }
  },
  methods: {
    start() {
      let beeps = new Audio('endbeep.wav');

      this.interval = setInterval(() => {
        this.time -= 1;
        if (this.time === 0 && this.breaktime === false) {
          this.started = false;
          this.breaktime = true;
          this.time = 300;
          this.initial = 300;
          this.showNotification(true);
          beeps.play();
          clearInterval(this.interval);
        } else if (this.time === 0 && this.breaktime === true) {
          this.started = false;
          this.breaktime = false;
          this.time = 1500;
          this.initial = 1500;
          this.showNotification(false);
          beeps.play();
          clearInterval(this.interval);
        }
      }, 1000);
      this.started = true;
    },
    pause() {
      clearInterval(this.interval);
      this.started = false;
    },

    showNotification: function(complete) {
      let message = complete ? this.message[0] : this.message[1];

      notifier.notify({
        'title': 'Pomodoro App',
        'message': '\n'+message,
        'icon': path.join(__dirname, 'pomodoro-app-icon.png'),
        'time': 3000,
      });
    }
  }

});
