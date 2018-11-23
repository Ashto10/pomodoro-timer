<template>
<div class="countdown" :class="colorScheme">
  <div class="countdown-display">{{ currentCount }}</div>
  <div v-if="!timerActive"
           class="timer-container">
    <Timer v-for="(timer, index) in timers"
           :key="index"
           :timer-type="timer.type"
           v-model="timer.max"></Timer>
  </div>
  <button class="toggle-countdown-button"
          @click="$emit('toggleTimer')"
          >{{ timerActive ? 'stop' : 'start' }}</button>
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

.countdown
  font-size: 24px
  text-align: center
  position: absolute
  left: 50vw
  top: 50vh
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
import Timer from './Timer.vue'

export default {
  name: 'countdown',
  components: {
    Timer
  },
  props: {
    'currentCount': {
      type: Number,
      required: true
    },
    'timers': {
      type: Array,
      required: true
    },
    'timerActive': {
      type: Boolean,
      required: true
    },
    'inverted': {
      type: Boolean,
      default: false
    }
  },
  computed: {
    colorScheme () {
      return this.inverted ? 'default' : 'inverted'
    }
  }
}
</script>
