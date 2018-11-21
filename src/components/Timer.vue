<template>
  <div class="timer">
    <span class="timer-type">{{ timerType }} time</span>
    <div class="timer-controls">
      <button class="change-minute-button" :disabled="seconds >= max" :class="{disabled: seconds >= max}" @click="changeMinute(1)">+</button>
      <span class="minute-display">{{ timerDisplay }}</span>
      <button class="change-minute-button" :disabled="seconds <= min" :class="{disabled: seconds <= min}" @click="changeMinute(-1)">-</button>
    </div>
  </div>
</template>

<style lang="sass">
  .timer
    margin: 10px
  .minute-display
    margin: 10px
  .timer-controls
    display: flex
    justify-content: center
    align-items: center
  .change-minute-button
    font-size: 1.5em
    height: 50px
    width: 50px
</style>

<script>
  export default {
    model: {
      prop: 'seconds',
      event: 'change'
    },
    name: 'Timer',
    props: {
      timerType: {
        type: String
      },
      seconds: {
        type: Number,
        default: 600
      }
    },
    data() {
      return {
        max: 3600,
        min: 60
      }
    },
    methods: {
      changeMinute(amount) {
        amount *= 60;
        if (this.seconds + amount < this.min || this.seconds + amount > this.max) {
          amount = 0;
        }
        this.$emit('change', this.seconds + amount);
      }
    },
    computed: {
      timerDisplay() {
        let m = Math.floor(this.seconds / 60);
        return `${m} min${m > 1 ? 's' : ''}`;
      }
    }
  }
</script>
