<template>
<div id="app">
  <div class="background default">
  <Countdown :inverted="true"
             :current-count="currentCount"
             :timers="timers"
             :timerActive="timerActive"
             @toggleTimer="toggleTimer"></Countdown>
  </div>
  <div class="background inverted"
       :style="{height: invertedHeight}">
  <Countdown :current-count="currentCount"
           :timers="timers"
           :timerActive="timerActive"
           @toggleTimer="toggleTimer"></Countdown>
  </div>
</div>
</template>

<style lang="sass">
body
  margin: 0

.background
  position: absolute
  width: 100%
  height: 100%
  background: orange
  overflow: hidden
  transition: height 0.99s linear

$borderHeight: 10px
  
.background.inverted
  top: 0
  background: brown
  &::after
    position: absolute
    content: ''
    display: block
    bottom: 0
    height: $borderHeight
    left: 0
    right: 0
    background: radial-gradient(closest-side, transparent, transparent 50%, orange 50%)
    background-size: ($borderHeight / 2) ($borderHeight * 1.75)
    background-position: $borderHeight (-$borderHeight * 0.8)
    background-repeat: repeat-x
    animation: water-flow 0.3s linear infinite
    left: -$borderHeight
  
@keyframes water-flow
  to
    transform: translateX($borderHeight)

.default, .default button
  color: brown
.inverted, .inverted button
  color: orange
  
</style>

<script>
import Countdown from './components/Countdown.vue'

export default {
  name: 'app',
  components: {
    Countdown
  },
  data () {
    return {
      timers: [
        {
          type: 'Work',
          max: 1500,
          startMessage: 'Back to work!'
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
        this.current = 0
        clearTimeout(this.timeout)
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
          this.displayTimerMessage = true
          this.current = this.current < this.timers.length - 1 ? this.current + 1 : 0
          this.timeout = setTimeout(this.startCountdown, 5000)
        } else {
          this.timeout = setTimeout(this.tick, 1000)
        }
      }
    }
  },
  computed: {
    currentCount () {
      if (this.displayTimerMessage) {
        return this.timers[this.current].startMessage
      }
      let t = this.timerActive ? this.seconds : this.timers[this.current].max
      return Math.floor(t / 60) + ':' + `${t % 60}`.padStart(2, '0')
    },
    invertedHeight () {
      if (!this.timerActive) {
        return '0'
      }
      if (this.displayTimerMessage) {
        return `${this.current % 2 === 0 ? 0 : 100}%`
      }
      let perc = this.seconds * 100 / this.timers[this.current].max
      if (this.current % 2 === 0) {
        perc = 100 - perc
      }
      return `${perc}%`
    }
  }
}
</script>
