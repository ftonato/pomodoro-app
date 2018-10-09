/*global Vue*/
/*eslint no-undef: "error"*/
/*eslint-env browser*/

const notifier = require('node-notifier');
const path = require('path');
const _NAME = 'Pomodoro App';
const _ICON = 'pomodoro-app-icon.png';
const _BEEP = new Audio('endbeep.wav');

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
    window.addEventListener('keyup', event => {
      event = event || window.event;
      this.mapButtonEvents(event);
    });
  },
  filters: {
    minutesAndSeconds() {
      let minutes = Math.floor(this.time / 60);
      let seconds = this.time - 60 * minutes;

      ({ minutes, seconds } = this.addZerosLeft(this.time, minutes, seconds));

      return `${minutes}:${seconds}`;
    }
  },
  methods: {
    start() {
      this.interval = setInterval(() => {
        this.time -= 1;
        if (this.time === 0 && this.breaktime === false) {
          this.started = false;
          this.breaktime = true;
          this.time = 300;
          this.initial = 300;
          this.showNotification(true);
          _BEEP.play();
          clearInterval(this.interval);
        } else if (this.time === 0 && this.breaktime === true) {
          this.started = false;
          this.breaktime = false;
          this.time = 1500;
          this.initial = 1500;
          this.showNotification(false);
          _BEEP.play();
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
      let enableToChangeTimer = self.started === false && self.breaktime === false;

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
        title: _NAME,
        message,
        icon: path.join(__dirname, _ICON),
        time: 3000
      });
    },
    mapButtonEvents(evt) {
      if (evt.ctrlKey && evt.keyCode == 82) {
        this.pause();
      }
      if (evt.ctrlKey && evt.keyCode == 83) {
        this.start();
      }
      if (evt.ctrlKey && evt.keyCode == 49) {
        this.setTimeAndInitial(300);
      }
      if (evt.ctrlKey && evt.keyCode == 50) {
        this.setTimeAndInitial(600);
      }
      if (evt.ctrlKey && evt.keyCode == 51) {
        this.setTimeAndInitial();
      }
    },
    setTimeAndInitial(time = 1500) {
      if (this.enableTimer()) {
        this.time = time;
        this.initial = time;
      }
    },
    addZerosLeft(time, minutes, seconds) {
      if (minutes < 10) {
        minutes = '0' + Math.floor(time / 60);
      } else if (minutes === 0) {
        minutes = '00';
      }
      if (seconds < 10) {
        seconds = '0' + (time - 60 * minutes);
      } else if (seconds === 0) {
        seconds = '00';
      }
      return { minutes, seconds };
    }
  }
});
