<template>
<div class="countdown" :class="colorScheme">
  <div class="countdown-display"
       :class="{enlarged: timerActive}">{{ currentCount }}</div>
  <div v-if="!timerActive"
           class="timer-container">
    <Timer v-for="(timer, index) in timers"
           :key="index"
           :timer-type="timer.type"
           v-model="timer.max"></Timer>
  </div>
  <button class="toggle-countdown-button"
          :class="{hovered: hoverStyle['toggle-countdown']}"
          @click="$emit('toggleTimer')"
          @mouseenter="startHover('toggle-countdown')"
          @mouseleave="stopHover('toggle-countdown')"
          >{{ timerActive ? 'stop' : 'start' }}</button>
</div>
</template>

<style lang="sass">
button
  background: none
  border: none
  padding: 0
  line-height: 1em
  border-style: solid
  &:hover, &.hovered
    box-shadow: 0 0 16px 0px
  &.disabled
    opacity: 0.35

.countdown
  font-size: 32px
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
  font-size: 2.5em
  &.enlarged
    font-size: 4.5em

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
import { EventBus } from './event-bus.js'

export default {
  name: 'countdown',
  components: {
    Timer
  },
  props: {
    'currentCount': {
      type: String,
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
  data () {
    return {
      hoverStyle: {
        'toggle-countdown': false
      }
    }
  },
  methods: {
    startHover (el) {
      EventBus.$emit('hover', el)
    },
    stopHover (el) {
      EventBus.$emit('stop-hover', el)
    }
  },
  computed: {
    colorScheme () {
      return this.inverted ? 'default' : 'inverted'
    }
  },
  mounted () {
    EventBus.$on('hover', el => {
      this.hoverStyle[el] = true
    }),
    EventBus.$on('stop-hover', el => {
      this.hoverStyle[el] = false
    })
  }
}
</script>
