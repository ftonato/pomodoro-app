/*global Vue*/
/*eslint no-undef: "error"*/
/*eslint-env browser*/

new Vue({
  el: '#app',
  data: {
    time: 10,
    initial: 10,
    started: false,
    breaktime: false
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
          this.time = 5;
          this.initial = 5;
          beeps.play();
          clearInterval(this.interval);
        } else if (this.time === 0 && this.breaktime === true) {
          this.started = false;
          this.breaktime = false;
          this.time = 10;
          this.initial = 10;
          beeps.play();
          clearInterval(this.interval);
        }
      }, 1000);
      this.started = true;
    },
    pause() {
      clearInterval(this.interval);
      this.started = false;
    }
  }

});
