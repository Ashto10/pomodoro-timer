<template>
  <div id="app">
    <div class="main-display">{{ timeDisplay }}</div>
    <section v-if="!timerActive" class="timer-container">
      <Timer v-for="(timer, index) in timers"
             :key="index"
             :timer-type="timer.type"
             v-model:seconds="timer.max"></Timer>
    </section>
    <button class="toggle-timer-button" @click="toggleTimer">{{ timerActive ? 'stop' : 'start' }}</button>
  </div>
</template>

<style lang="sass">
  button
    background: none
    border: none
    padding: 0
    &:hover
      border-style: solid
      line-height: 1
  #app
    font-size: 3.5vmin
    text-align: center
    width: 80%
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    font-family: 'Droid Sans Mono', sans-serif
    text-transform: lowercase
  
  .main-display
    margin-bottom: 16px
    font-size: 4em

  .timer-container
    display: flex
    flex-wrap: wrap
    justify-content: center
    
  .toggle-timer-button
    font-size: 1.5em
    margin-top: 16px
    height: 50px
    width: 100px
</style>

<script>
  import Timer from './components/Timer.vue'

  export default {
    name: 'app',
    components: {
      Timer
    },
    data() {
      return {
        timers: [
          {
            type: 'Work',
            max: 1500,
            startMessage: 'Back to the grind!'
          },
          {
            type: 'Rest',
            max: 300,
            startMessage: 'Break time!'
          }
        ],
        timerActive: false,
        displayTimerMessage: false,
        current: 0,
        seconds: 3000
      }
    },
    methods: {
      toggleTimer() {
        this.timerActive = !this.timerActive;
        if (this.timerActive) {
          this.startCountdown();
        } else {
          this.displayTimerMessage = false;
        }
      },
      startCountdown() {
        this.displayTimerMessage = false;
        this.seconds = this.timers[this.current].max + 1;
        this.tick();
      },
      tick() {
        if (this.timerActive) {
          this.seconds--;
          if (this.seconds <= 0) {
            this.current = this.current < this.timers.length - 1 ? this.current + 1 : 0;
            this.displayTimerMessage = true;
            setTimeout(this.startCountdown, 5000);
          } else {
            setTimeout(this.tick, 1000);
          }
        }
      }
    },
    computed: {
      timeDisplay() {
        if (this.displayTimerMessage) {
          return this.timers[this.current].startMessage;
        }
        let t = this.timerActive ? this.seconds : this.timers[this.current].max;          
        return Math.floor(t / 60) + ':' + new String(t % 60).padStart(2, '0');
      }
    }
  }
</script>