<template>
<div id="app">
  <div class="countdown-display">{{ timeDisplay }}</div>
  <section v-if="!timerActive" class="timer-container">
    <Timer v-for="(timer, index) in timers"
           :key="index"
           :timer-type="timer.type"
           v-model="timer.max"></Timer>
  </section>
  <button class="toggle-countdown-button" @click="toggleTimer">{{ timerActive ? 'stop' : 'start' }}</button>
</div>
</template>

<style lang="sass">
button
  background: none
  border: none
  padding: 0
  line-height: 1em
  &:hover
    border-style: solid
#app
  font-size: 24px
  text-align: center
  position: absolute
  left: 50%
  top: 50%
  width: 80%
  max-width: 960px
  transform: translate(-50%, -50%)
  font-family: 'Droid Sans Mono', sans-serif
  text-transform: lowercase

.countdown-display
  display: flex
  justify-content: center
  align-items: flex-end
  margin-bottom: 0.5em
  font-size: 2em

.timer-container
  display: flex
  flex-wrap: wrap
  justify-content: center

.toggle-countdown-button
  font-size: 1.25em
  height: 2em
  margin-top: 0.25em
  padding: 0 0.7em
</style>

<script>
import Timer from './components/Timer.vue'

export default {
  name: 'app',
  components: {
    Timer
  },
  data () {
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
      timeout: null,
      current: 0,
      seconds: 3000
    }
  },
  methods: {
    toggleTimer () {
      this.timerActive = !this.timerActive
      if (this.timerActive) {
        this.startCountdown()
      } else {
        this.displayTimerMessage = false
        clearTimeout(this.interval)
      }
    },
    startCountdown () {
      this.displayTimerMessage = false
      this.seconds = this.timers[this.current].max + 1
      this.tick()
    },
    tick () {
      if (this.timerActive) {
        this.seconds--
        if (this.seconds <= 0) {
          this.current = this.current < this.timers.length - 1 ? this.current + 1 : 0
          this.displayTimerMessage = true
          this.interval = setTimeout(this.startCountdown, 5000)
        } else {
          this.interval = setTimeout(this.tick, 1000)
        }
      }
    }
  },
  computed: {
    timeDisplay () {
      if (this.displayTimerMessage) {
        return this.timers[this.current].startMessage
      }
      let t = this.timerActive ? this.seconds : this.timers[this.current].max
      return Math.floor(t / 60) + ':' + `${t % 60}`.padStart(2, '0')
    }
  }
}
</script>
