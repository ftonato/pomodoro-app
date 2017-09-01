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
  ready() {
    let self = this;
    window.addEventListener('keyup', function(evt) {
      evt = evt || window.event;
      if (evt.ctrlKey && evt.keyCode == 82) {
        self.pause();
      }
      if (evt.ctrlKey && evt.keyCode == 83) {
        self.start();
      }
      if (evt.ctrlKey && evt.keyCode == 49) {
        if (self.enableTimer()) {
          self.time = 300;
          self.initial = 300;
        }
      }
      if (evt.ctrlKey && evt.keyCode == 50) {
        if (self.enableTimer()) {
          self.time = 600;
          self.initial = 600;
        }
      }
      if (evt.ctrlKey && evt.keyCode == 51) {
        if (self.enableTimer()) {
          self.time = 1500;
          self.initial = 1500;
        }
      }
    });

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

    enableTimer() {
      let self = this;
      let enableToChangeTimer = (self.started === false && self.breaktime === false);

      if (!enableToChangeTimer) {
        self.message[0] = 'Impossible to change the "timer" while the Pomodoro or Breaktime happens!';
        self.showNotification(true);
        self.message[0] = 'Pomodoro Complete';
        return false;
      }
      return true;
    },
    showNotification(complete) {
      let message = complete ? this.message[0] : this.message[1];

      notifier.notify({
        title: 'Pomodoro App',
        message: '\n'+message,
        icon: path.join(__dirname, 'pomodoro-app-icon.png'),
        time: 3000,
      });
    }
  }

});
